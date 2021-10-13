import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

/*****************
    Metascore
*****************/
import Metascore "mo:metascore/Metascore";

shared ({ caller = owner }) actor class Metagame() : async Metascore.GameInterface = self {
    let metascore : Metascore.MetascoreInterface = actor("rl4ub-oqaaa-aaaah-qbi3a-cai");
    
    //For Metascore integration you need to present your players like that 
    public type Player = {
        #stoic : Principal;
        #plug : Principal;
    };

    func _playerEqual (a : Player, b : Player) : Bool {
         switch (a, b) {
            case (#stoic(a), #stoic(b)) { Principal.equal(a, b); };
            case (#plug(a) , #plug(b) ) { Principal.equal(a, b); };
            case (_) { false; };
        };
    };

   func _playerHash (player : Player) : Hash.Hash {
        switch (player) {
            case (#stoic(principal)) { Principal.hash(principal); };
            case (#plug(principal))  { Principal.hash(principal); };
        };
    };

    func _playerPrincipal (player  :  Player) : Principal {
        switch (player) {
            case (#stoic(principal)) { principal };
            case (#plug(principal))  { principal };
        };
    };
    func _playerPrincipalToText(player : Player) : Text {
        switch (player) {
            case (#stoic(principal)) { Principal.toText(principal); };
            case (#plug(principal))  { Principal.toText(principal); };
        };
    };


    public type PlayerInfo = {
        name : Text;
        // You can add more infos : avatar, role, email , score .... 
    };

    stable var playersEntries :  [(Player,PlayerInfo)] = [];
    let players : HashMap.HashMap<Player,PlayerInfo> = HashMap.fromIter(playersEntries.vals(),0, _playerEqual,_playerHash);


    // Your canister is responsible for storing its own full list of scores.
    // Metascore will only store the highest score for each player.
    public type Score = (Player,Nat); 

    stable var scores : [Metascore.Score] = [];

    // REQUIRED function to integrate with Metascore.
    // Metascore will call this method upon registration and around once per day.
    public query func metascoreScores() : async [Metascore.Score] {
        scores;
    };

    // REQUIRED function to integrate with Metascore.
    // Metascore will call this function when registering your canister, or when requesting updated metadata.
    public shared func metascoreRegisterSelf(callback : Metascore.RegisterCallback) : async () {
        await callback({
            name = "Cosmic Test";
        });
    };

    // A function we can use to register our game in metascore 
    public func register () : async Result.Result<(), Text> {
        await metascore.register(Principal.fromActor(self));
    };

    //A function to register a new score to metascore.

    func _newScore (player : Player, score : Nat) : async () {
        let newScore : Metascore.Score = (player, score);

        // Store your score in your own canister.
        scores := Array.append(scores, [newScore]);
        return;

        // When a new high score for a player happens, you should push that to Metascore.
        // This will ensure that your game is up-to-date in our canisters.
        // NOTE: Metascore does not implement this method yet
        await metascore.scoreUpdate([newScore]);
    };

    public type PlayerRegister = {
        player : Player;
        name : Text; 
        //You can add more infos
    };    

    public type PlayerRegisterResponse = Result.Result<(), {
        #AlreadyExist;
        #Unknown;
    }>;

    public type PlayerInfosResponse = Result.Result<(Text),{
        #NotFound;
        #Unknown;
    }>;

    public shared (msg) func addPlayer (registration : PlayerRegister) : async PlayerRegisterResponse {

        let principal : Principal = _playerPrincipal(registration.player);
        assert(msg.caller == principal);
        switch(players.get(registration.player)) {
            case (?player) return #err (#AlreadyExist);
            case (null) {
                let infos : PlayerInfo = {
                    name = registration.name;
                };

                players.put(registration.player,infos);
                return #ok;
            }
        };
        return #err (#Unknown);
    };

    public shared (msg) func getInfosOfPlayer (player : Player) : async PlayerInfosResponse {
        let principal : Principal = _playerPrincipal(player);
        assert(msg.caller == principal); 

        switch (players.get(player)) {
            case (null) return #err (#NotFound);
            case (?infos) return #ok (infos.name);
        }

    };

    public func testPlayer (player  : Player) : async Bool {
        return true
    };

    public func testBasic () : async Bool {
        return true
    };
};