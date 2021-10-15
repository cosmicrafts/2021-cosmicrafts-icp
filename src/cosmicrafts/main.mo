import Types "./types";

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

/*****************
    Metascore
*****************/
import Metascore "mo:metascore/Metascore";
import Token "../score_token/score_token";

shared ({ caller = owner }) actor class Metagame() : async Metascore.GameInterface = self {
    type Users = Types.Users;
    type UserId = Types.UserId;
    type UserName = Types.UserName;
    type UserWallet = Types.UserWallet;
    type ScoreCC = Types.ScoreCC;
    type Highscore = Types.Highscore;
    type Level = Types.Level;
    type GamesPlayed = Types.GamesPlayed;
    type GamesWon = Types.GamesWon;

    let scoreToken : Token.Token = actor("avnm2-3aaaa-aaaaj-qacba-cai");

    stable var users : [Users] = [];
    stable var scoreTokenCreated : Bool = false;
    //stable var counter : Int = 0;

    public func saveUser(name : UserName, uId : Text,  wll : UserWallet) : async ?Users {
        let userId : Principal = Principal.fromText(uId);
        let usr : Users = {
                            id          = userId;
                            user        = name; 
                            wallet      = wll; 
                            score       = 0; 
                            highscore   = 0;
                            level       = 0;
                            gamesPlayed = 0;
                            gamesWon    = 0;
                        };
        let _usr : ?Users = get_wallet(usr);
        switch(_usr){
            case null{
                if(name != ""){
                    users := Array.append<Users>(users, [usr]);
                };
                return _usr;
            };
            case (?_) {
                return _usr;
            };
        }
    };

    public query func getAllUsers() : async [Users] {
        return users;
    };

    public query func getUser(wll : UserWallet, uId : Text) : async ?Users {
        let name : Text = "";
        let userId : Principal = Principal.fromText(uId);
        var usr : Users = {
                            id          = userId;
                            user        = name; 
                            wallet      = wll; 
                            score       = 0; 
                            highscore   = 0;
                            level       = 0;
                            gamesPlayed = 0;
                            gamesWon    = 0;
                        };
        return get_wallet(usr);
    };

    public query func checkWalletExists(wll : UserWallet, uId : Text) : async Bool {
        let name : Text = "";
        let userId : Principal = Principal.fromText(uId);
        let usr : Users = {
                            id          = userId;
                            user        = name; 
                            wallet      = wll; 
                            score       = 0; 
                            highscore   = 0;
                            level       = 0;
                            gamesPlayed = 0;
                            gamesWon    = 0;
                        };
        switch(get_wallet(usr)){
            case null{
                return false;
            };
            case (?_) {
                return true;
            };
        }
    };

    public query func checkUsernameAvailable(name : UserName) : async Bool{
        let wll : Text = "";
        let userId : Principal = Principal.fromText("vv52s-veea6-gw2ea-i7un6-uri35-6t5dx-go6cj-lfmkt-5objd-ia7if-3qe");
        let usr : Users = {
                            id          = userId;
                            user        = name; 
                            wallet      = wll; 
                            score       = 0; 
                            highscore   = 0;
                            level       = 0;
                            gamesPlayed = 0;
                            gamesWon    = 0;
                        };
        switch(get_user(usr)){
            case null{
                return true;
            };
            case (?_) {
                return false;
            };
        }
    };

    public func saveUserScore(wll: UserWallet, uId : Text, scr: ScoreCC, hscr: Highscore) : async Bool{
        let userId : Principal = Principal.fromText(uId);
        let usr : Users = {
                            id          = userId;
                            user        = "";
                            wallet      = wll; 
                            score       = 0; 
                            highscore   = 0;
                            level       = 0;
                            gamesPlayed = 0;
                            gamesWon    = 0;
                        };
        switch(get_wallet(usr)){
            case null{
                return false;
            };
            case (?actualUser) {
                let _res : (Bool, Text) = await scoreToken.mint(wll, scr);
                let _scr : ScoreCC = actualUser.score + scr;
                let _gp : GamesPlayed = actualUser.gamesPlayed + 1;
                let _u : Users = {
                    id          = userId;
                    user        = actualUser.user;
                    wallet      = actualUser.wallet;
                    score       = _scr;
                    highscore   = hscr;
                    level       = actualUser.level;
                    gamesPlayed = _gp;
                    gamesWon    = actualUser.gamesWon;
                };
                var usersTemp : [Users] = [];
                for(u in users.vals()){
                    if(u.wallet == actualUser.wallet){
                        usersTemp := Array.append<Users>(usersTemp, [_u]);
                    } else {
                        usersTemp := Array.append<Users>(usersTemp, [u]);
                    };
                };
                users := usersTemp;
                return true;
            };
        }
    };

    func get_user(usr: Users) : ?Users {
        Array.find<Users>(users, func x {x.user == usr.user});
    };

    func get_wallet(usr: Users) : ?Users {
        Array.find<Users>(users, func x {x.wallet == usr.wallet});
    };

    public query func getScoreTokenCreated() : async Bool {
        return scoreTokenCreated;
    };

    public func setScoreTokenCreated() : async Bool {
        scoreTokenCreated := true;
        return scoreTokenCreated;
    };


    /*
    //// HTTP
    type HeaderField = (Text, Text);

    type HttpRequest = {
        method: Text;
        url: Text;
        headers: [HeaderField];
        body: Blob;
    };

    type HttpResponse = {
        status_code: Nat16;
        headers: [HeaderField];
        body: Blob;
    };

    public query func http_request(request: HttpRequest): async HttpResponse {
        Debug.print("Woah, it works!!");
        counter += 1;
        return {
            status_code = 200;
            headers = [("Content-Type", "text/html")];
            body = Text.encodeUtf8("Calls: " # Int.toText(counter));
        };
    };

    public shared func http_update(request: HttpRequest): async HttpResponse {
        Debug.print("Woah, it works!!");
        counter += 1;
        return {
            status_code = 200;
            headers = [("Content-Type", "text/html")];
            body = Text.encodeUtf8("Calls: " # Int.toText(counter));
        };
    };
    */

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
            name = "Cosmicrafts";
            playUrl = "https://4nxsr-yyaaa-aaaaj-aaboq-cai.ic0.app/game";
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