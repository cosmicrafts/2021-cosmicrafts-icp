import type { Principal } from '@dfinity/principal';
export type GamesPlayed = bigint;
export type GamesWon = bigint;
export type Highscore = bigint;
export type Highscore__1 = bigint;
export type Level = bigint;
export interface Metadata { 'name' : string }
export interface Metagame {
  'addPlayer' : (arg_0: PlayerRegister) => Promise<PlayerRegisterResponse>,
  'checkUsernameAvailable' : (arg_0: UserName) => Promise<boolean>,
  'checkWalletExists' : (arg_0: UserWallet, arg_1: string) => Promise<boolean>,
  'getAllUsers' : () => Promise<Array<Users>>,
  'getInfosOfPlayer' : (arg_0: Player) => Promise<PlayerInfosResponse>,
  'getScoreTokenCreated' : () => Promise<boolean>,
  'getUser' : (arg_0: UserWallet, arg_1: string) => Promise<[] | [Users]>,
  'metascoreRegisterSelf' : (arg_0: [Principal, string]) => Promise<undefined>,
  'metascoreScores' : () => Promise<Array<Score>>,
  'register' : () => Promise<Result>,
  'saveUser' : (arg_0: UserName, arg_1: string, arg_2: UserWallet) => Promise<
      [] | [Users]
    >,
  'saveUserScore' : (
      arg_0: UserWallet,
      arg_1: string,
      arg_2: ScoreCC,
      arg_3: Highscore,
    ) => Promise<boolean>,
  'setScoreTokenCreated' : () => Promise<boolean>,
  'testBasic' : () => Promise<boolean>,
  'testPlayer' : (arg_0: Player) => Promise<boolean>,
}
export type Player = { 'plug' : Principal } |
  { 'stoic' : Principal };
export type PlayerInfosResponse = { 'ok' : string } |
  { 'err' : { 'NotFound' : null } | { 'Unknown' : null } };
export interface PlayerRegister { 'player' : Player, 'name' : string }
export type PlayerRegisterResponse = { 'ok' : null } |
  { 'err' : { 'AlreadyExist' : null } | { 'Unknown' : null } };
export type Player__1 = { 'plug' : Principal } |
  { 'stoic' : Principal };
export type RegisterCallback = (arg_0: Metadata) => Promise<undefined>;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Score = [Player__1, bigint];
export type ScoreCC = bigint;
export type ScoreCC__1 = bigint;
export type UserId = Principal;
export type UserName = string;
export type UserName__1 = string;
export type UserWallet = string;
export type UserWallet__1 = string;
export interface Users {
  'id' : UserId,
  'gamesPlayed' : GamesPlayed,
  'user' : UserName__1,
  'level' : Level,
  'score' : ScoreCC__1,
  'wallet' : UserWallet__1,
  'gamesWon' : GamesWon,
  'highscore' : Highscore__1,
}
export interface _SERVICE extends Metagame {}
