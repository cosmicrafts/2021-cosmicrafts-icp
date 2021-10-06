import Types "./types";
import Array "mo:base/Array";

import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Int "mo:base/Int";

actor {
    type Users = Types.Users;
    type UserId = Types.UserId;
    type UserName = Types.UserName;
    type UserWallet = Types.UserWallet;

    stable var users : [Users] = [];
    stable var counter : Int = 0;

    public func saveUser(name : UserName, wll : UserWallet) : async ?Users {
        let usr : Users = {user = name; wallet = wll};
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
        var usr : Users = {user = name; wallet = wll};
        return get_wallet(usr);
    };

    public query func checkWalletExists(wll : UserWallet) : async Bool {
        let name : Text = "";
        let usr : Users = {user = name; wallet = wll};
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
        let usr : Users = {user = name; wallet = wll};
        switch(get_user(usr)){
            case null{
                return true;
            };
            case (?_) {
                return false;
            };
        }
    };

    func get_user(usr: Users) : ?Users {
        Array.find<Users>(users, func x {x.user == usr.user});
    };

    func get_wallet(usr: Users) : ?Users {
        Array.find<Users>(users, func x {x.wallet == usr.wallet});
    };



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

    

};
