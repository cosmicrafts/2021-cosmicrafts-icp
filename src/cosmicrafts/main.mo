import Types "./types";
import Metagame "./metascore";

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Hash "mo:base/Hash";

/**************
    Game
**************/

actor {
    type Users = Types.Users;
    type UserId = Types.UserId;
    type UserName = Types.UserName;
    type UserWallet = Types.UserWallet;
    type Score = Types.Score;
    type Highscore = Types.Highscore;
    type Level = Types.Level;
    type GamesPlayed = Types.GamesPlayed;
    type GamesWon = Types.GamesWon;

    stable var users : [Users] = [];
    //stable var counter : Int = 0;

    public func saveUser(name : UserName, wll : UserWallet) : async ?Users {
        let usr : Users = {
                            user = name; 
                            wallet = wll; 
                            score = 0; 
                            highscore = 0;
                            level = 0;
                            gamesPlayed = 0;
                            gamesWon = 0;
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

    public query func getUser(wll : UserWallet) : async ?Users {
        let name : Text = "";
        var usr : Users = {
                            user = name; 
                            wallet = wll; 
                            score = 0; 
                            highscore = 0;
                            level = 0;
                            gamesPlayed = 0;
                            gamesWon = 0;
                        };
        return get_wallet(usr);
    };

    public query func checkWalletExists(wll : UserWallet) : async Bool {
        let name : Text = "";
        let usr : Users = {
                            user = name; 
                            wallet = wll; 
                            score = 0; 
                            highscore = 0;
                            level = 0;
                            gamesPlayed = 0;
                            gamesWon = 0;
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
        let usr : Users = {
                            user = name; 
                            wallet = wll; 
                            score = 0; 
                            highscore = 0;
                            level = 0;
                            gamesPlayed = 0;
                            gamesWon = 0;
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

    public func saveUserScore(wll: UserWallet, scr: Score, hscr: Highscore) : async Bool{
        let usr : Users = {
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
                let _scr : Score = actualUser.score + scr;
                let _gp : GamesPlayed = actualUser.gamesPlayed + 1;
                let _u : Users = {
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
    

};
