import type { Principal } from '@dfinity/principal';
export interface Account { 'hash' : Array<number> }
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
  'allHistory' : () => Promise<Array<OpRecord>>,
  'allowance' : (arg_0: string, arg_1: string) => Promise<bigint>,
  'approve' : (arg_0: string, arg_1: bigint) => Promise<[boolean, string]>,
  'balanceOf' : (arg_0: string) => Promise<bigint>,
  'burn' : (arg_0: string, arg_1: bigint) => Promise<[boolean, string]>,
  'decimals' : () => Promise<bigint>,
  'getHistoryByAccount' : (arg_0: string) => Promise<[] | [Array<OpRecord>]>,
  'getHistoryByHash' : (arg_0: string) => Promise<[] | [OpRecord]>,
  'metadata' : () => Promise<Metadata>,
  'mint' : (arg_0: string, arg_1: bigint) => Promise<[boolean, string]>,
  'name' : () => Promise<string>,
  'owner' : () => Promise<string>,
  'symbol' : () => Promise<string>,
  'totalSupply' : () => Promise<bigint>,
  'transfer' : (arg_0: string, arg_1: bigint) => Promise<[boolean, string]>,
  'transferFrom' : (arg_0: string, arg_1: string, arg_2: bigint) => Promise<
      [boolean, string]
    >,
  'whoami' : () => Promise<string>,
}
export interface _SERVICE extends Token {}
