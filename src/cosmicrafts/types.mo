import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
    public type UserId = Principal;
    public type UserName = Text;
    public type UserWallet = Text;

    public type Users = {
        user: UserName;
        wallet: UserWallet;
    };
}