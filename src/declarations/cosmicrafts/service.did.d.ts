import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type GameStatus = string;
export type GamesPlayed = bigint;
export type GamesWon = bigint;
export type Highscore = bigint;
export type Level = bigint;
export interface Metadata { 'name' : string }
export interface Metagame {
  'addPlayer' : ActorMethod<[PlayerRegister], PlayerRegisterResponse>,
  'checkUsernameAvailable' : ActorMethod<[UserName], boolean>,
  'checkWalletExists' : ActorMethod<[UserWallet, string], boolean>,
  'createGame' : ActorMethod<[string, string], Principal>,
  'getAllUsers' : ActorMethod<[], Array<Users>>,
  'getInfosOfPlayer' : ActorMethod<[Player], PlayerInfosResponse>,
  'getScoreTokenCreated' : ActorMethod<[], boolean>,
  'getUser' : ActorMethod<[UserWallet, string], [] | [Users]>,
  'metascoreRegisterSelf' : ActorMethod<[[Principal, string]], undefined>,
  'metascoreScores' : ActorMethod<[], Array<Score>>,
  'register' : ActorMethod<[], Result>,
  'saveUser' : ActorMethod<[UserName, string, UserWallet], [] | [Users]>,
  'saveUserScore' : ActorMethod<
    [UserWallet, string, ScoreCC, Highscore],
    boolean
  >,
  'setGameInProgressData' : ActorMethod<[GameStatus, string], boolean>,
  'setScoreTokenCreated' : ActorMethod<[], boolean>,
  'testBasic' : ActorMethod<[], boolean>,
  'testPlayer' : ActorMethod<[Player], boolean>,
}
export type Player = { 'plug' : Principal } |
  { 'stoic' : Principal };
export type PlayerInfosResponse = { 'ok' : string } |
  { 'err' : { 'NotFound' : null } | { 'Unknown' : null } };
export interface PlayerRegister { 'player' : Player, 'name' : string }
export type PlayerRegisterResponse = { 'ok' : null } |
  { 'err' : { 'AlreadyExist' : null } | { 'Unknown' : null } };
export type RegisterCallback = ActorMethod<[Metadata], undefined>;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Score = [Player, bigint];
export type ScoreCC = bigint;
export type UserId = Principal;
export type UserName = string;
export type UserWallet = string;
export interface Users {
  'id' : UserId,
  'gamesPlayed' : GamesPlayed,
  'user' : UserName,
  'level' : Level,
  'score' : ScoreCC,
  'wallet' : UserWallet,
  'gamesWon' : GamesWon,
  'highscore' : Highscore,
}
export interface _SERVICE extends Metagame {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
