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
    
    /// Metascore Player Type
    public type Player = {
        #stoic : Principal;
        #plug : Principal;
    };

    // Your canister is responsible for storing its own full list of scores.
    // Metascore will only store the highest score for each player.
    public type Score = (Player,Nat); 

    stable var scores : [Metascore.Score] = [];

    /// Helper functions
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
        });
    };

    // A function we can use to register our game in metascore 
    public func register () : async Result.Result<(), Text> {
        await metascore.register(Principal.fromActor(self));
    };
};