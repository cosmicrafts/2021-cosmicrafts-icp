import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
    public type UserId = Principal;
    public type UserName = Text;
    public type UserWallet = Text;
    public type Score = Nat;
    public type Highscore = Nat;
    public type Level = Nat;
    public type GamesPlayed = Nat;
    public type GamesWon = Nat;

    public type Users = {
        user: UserName;
        wallet: UserWallet;
        score: Score;
        highscore: Highscore;
        level: Level;
        gamesPlayed: GamesPlayed;
        gamesWon: GamesWon;
    };
}