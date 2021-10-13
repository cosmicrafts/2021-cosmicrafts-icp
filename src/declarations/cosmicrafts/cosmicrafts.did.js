export const idlFactory = ({ IDL }) => {
  const Player = IDL.Variant({
    'plug' : IDL.Principal,
    'stoic' : IDL.Principal,
  });
  const PlayerRegister = IDL.Record({ 'player' : Player, 'name' : IDL.Text });
  const PlayerRegisterResponse = IDL.Variant({
    'ok' : IDL.Null,
    'err' : IDL.Variant({ 'AlreadyExist' : IDL.Null, 'Unknown' : IDL.Null }),
  });
  const UserName = IDL.Text;
  const UserWallet = IDL.Text;
  const GamesPlayed = IDL.Nat;
  const UserName__1 = IDL.Text;
  const Level = IDL.Nat;
  const ScoreCC__1 = IDL.Nat;
  const UserWallet__1 = IDL.Text;
  const GamesWon = IDL.Nat;
  const Highscore__1 = IDL.Nat;
  const Users = IDL.Record({
    'gamesPlayed' : GamesPlayed,
    'user' : UserName__1,
    'level' : Level,
    'score' : ScoreCC__1,
    'wallet' : UserWallet__1,
    'gamesWon' : GamesWon,
    'highscore' : Highscore__1,
  });
  const PlayerInfosResponse = IDL.Variant({
    'ok' : IDL.Text,
    'err' : IDL.Variant({ 'NotFound' : IDL.Null, 'Unknown' : IDL.Null }),
  });
  const Metadata = IDL.Record({ 'name' : IDL.Text });
  const RegisterCallback = IDL.Func([Metadata], [], []);
  const Player__1 = IDL.Variant({
    'plug' : IDL.Principal,
    'stoic' : IDL.Principal,
  });
  const Score = IDL.Tuple(Player__1, IDL.Nat);
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const ScoreCC = IDL.Nat;
  const Highscore = IDL.Nat;
  const Metagame = IDL.Service({
    'addPlayer' : IDL.Func([PlayerRegister], [PlayerRegisterResponse], []),
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func([UserWallet], [IDL.Bool], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getInfosOfPlayer' : IDL.Func([Player], [PlayerInfosResponse], []),
    'getUser' : IDL.Func([UserWallet], [IDL.Opt(Users)], ['query']),
    'metascoreRegisterSelf' : IDL.Func([RegisterCallback], [], []),
    'metascoreScores' : IDL.Func([], [IDL.Vec(Score)], ['query']),
    'register' : IDL.Func([], [Result], []),
    'saveUser' : IDL.Func([UserName, UserWallet], [IDL.Opt(Users)], []),
    'saveUserScore' : IDL.Func(
        [UserWallet, ScoreCC, Highscore],
        [IDL.Bool],
        [],
      ),
    'testBasic' : IDL.Func([], [IDL.Bool], []),
    'testPlayer' : IDL.Func([Player], [IDL.Bool], []),
  });
  return Metagame;
};
export const init = ({ IDL }) => { return []; };
