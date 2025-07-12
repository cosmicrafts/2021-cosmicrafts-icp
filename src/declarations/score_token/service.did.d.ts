import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account { 'hash' : Uint8Array | number[] }
export interface Metadata {
  'fee' : bigint,
  'decimals' : bigint,
  'owner' : Account,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'symbol' : string,
}
export interface OpRecord {
  'op' : Operation,
  'to' : [] | [string],
  'fee' : [] | [bigint],
  'status' : Status,
  'from' : [] | [string],
  'hash' : string,
  'memo' : [] | [bigint],
  'timestamp' : Time,
  'caller' : string,
  'index' : bigint,
  'amount' : bigint,
}
export type Operation = { 'burn' : null } |
  { 'init' : null } |
  { 'mint' : null } |
  { 'approve' : null } |
  { 'transfer' : null };
export type Status = { 'success' : null } |
  { 'failed' : null };
export type Time = bigint;
export interface Token {
  'allHistory' : ActorMethod<[], Array<OpRecord>>,
  'allowance' : ActorMethod<[string, string], bigint>,
  'approve' : ActorMethod<[string, bigint], [boolean, string]>,
  'balanceOf' : ActorMethod<[string], bigint>,
  'burn' : ActorMethod<[string, bigint], [boolean, string]>,
  'decimals' : ActorMethod<[], bigint>,
  'getHistoryByAccount' : ActorMethod<[string], [] | [Array<OpRecord>]>,
  'getHistoryByHash' : ActorMethod<[string], [] | [OpRecord]>,
  'metadata' : ActorMethod<[], Metadata>,
  'mint' : ActorMethod<[string, bigint], [boolean, string]>,
  'name' : ActorMethod<[], string>,
  'owner' : ActorMethod<[], string>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[string, bigint], [boolean, string]>,
  'transferFrom' : ActorMethod<[string, string, bigint], [boolean, string]>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends Token {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
