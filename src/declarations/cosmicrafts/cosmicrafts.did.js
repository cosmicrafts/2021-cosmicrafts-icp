export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const UserWallet = IDL.Text;
  const GamesPlayed = IDL.Nat;
  const UserName__1 = IDL.Text;
  const Level = IDL.Nat;
  const Score__1 = IDL.Nat;
  const UserWallet__1 = IDL.Text;
  const GamesWon = IDL.Nat;
  const Highscore__1 = IDL.Nat;
  const Users = IDL.Record({
    'gamesPlayed' : GamesPlayed,
    'user' : UserName__1,
    'level' : Level,
    'score' : Score__1,
    'wallet' : UserWallet__1,
    'gamesWon' : GamesWon,
    'highscore' : Highscore__1,
  });
  const Score = IDL.Nat;
  const Highscore = IDL.Nat;
  return IDL.Service({
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func([UserWallet], [IDL.Bool], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getUser' : IDL.Func([UserWallet], [IDL.Opt(Users)], ['query']),
    'saveUser' : IDL.Func([UserName, UserWallet], [IDL.Opt(Users)], []),
    'saveUserScore' : IDL.Func([UserWallet, Score, Highscore], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
