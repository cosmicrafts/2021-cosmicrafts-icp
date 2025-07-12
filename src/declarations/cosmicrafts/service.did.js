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
  const UserId = IDL.Principal;
  const GamesPlayed = IDL.Nat;
  const Level = IDL.Nat;
  const ScoreCC = IDL.Nat64;
  const GamesWon = IDL.Nat;
  const Highscore = IDL.Nat;
  const Users = IDL.Record({
    'id' : UserId,
    'gamesPlayed' : GamesPlayed,
    'user' : UserName,
    'level' : Level,
    'score' : ScoreCC,
    'wallet' : UserWallet,
    'gamesWon' : GamesWon,
    'highscore' : Highscore,
  });
  const PlayerInfosResponse = IDL.Variant({
    'ok' : IDL.Text,
    'err' : IDL.Variant({ 'NotFound' : IDL.Null, 'Unknown' : IDL.Null }),
  });
  const Metadata = IDL.Record({ 'name' : IDL.Text });
  const RegisterCallback = IDL.Func([Metadata], [], []);
  const Score = IDL.Tuple(Player, IDL.Nat);
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const GameStatus = IDL.Text;
  const Metagame = IDL.Service({
    'addPlayer' : IDL.Func([PlayerRegister], [PlayerRegisterResponse], []),
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func(
        [UserWallet, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'createGame' : IDL.Func([IDL.Text, IDL.Text], [IDL.Principal], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getInfosOfPlayer' : IDL.Func([Player], [PlayerInfosResponse], []),
    'getScoreTokenCreated' : IDL.Func([], [IDL.Bool], ['query']),
    'getUser' : IDL.Func([UserWallet, IDL.Text], [IDL.Opt(Users)], ['query']),
    'metascoreRegisterSelf' : IDL.Func([RegisterCallback], [], []),
    'metascoreScores' : IDL.Func([], [IDL.Vec(Score)], ['query']),
    'register' : IDL.Func([], [Result], []),
    'saveUser' : IDL.Func(
        [UserName, IDL.Text, UserWallet],
        [IDL.Opt(Users)],
        [],
      ),
    'saveUserScore' : IDL.Func(
        [UserWallet, IDL.Text, ScoreCC, Highscore],
        [IDL.Bool],
        [],
      ),
    'setGameInProgressData' : IDL.Func([GameStatus, IDL.Text], [IDL.Bool], []),
    'setScoreTokenCreated' : IDL.Func([], [IDL.Bool], []),
    'testBasic' : IDL.Func([], [IDL.Bool], []),
    'testPlayer' : IDL.Func([Player], [IDL.Bool], []),
  });
  return Metagame;
};
export const init = ({ IDL }) => { return []; };
