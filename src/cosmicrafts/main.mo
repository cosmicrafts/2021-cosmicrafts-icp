import Types "./types";
import Array "mo:base/Array";

actor {
    type Users = Types.Users;
    type UserId = Types.UserId;
    type UserName = Types.UserName;
    type UserWallet = Types.UserWallet;

    stable var users : [Users] = [];

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

};
