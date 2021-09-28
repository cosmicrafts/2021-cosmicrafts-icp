import type { Principal } from '@dfinity/principal';
export type UserName = string;
export type UserName__1 = string;
export type UserWallet = string;
export type UserWallet__1 = string;
export interface Users { 'user' : UserName__1, 'wallet' : UserWallet__1 }
export interface _SERVICE {
  'checkUsernameAvailable' : (arg_0: UserName) => Promise<boolean>,
  'checkWalletExists' : (arg_0: UserWallet) => Promise<boolean>,
  'getAllUsers' : () => Promise<Array<Users>>,
  'getUser' : (arg_0: UserWallet) => Promise<[] | [Users]>,
  'saveUser' : (arg_0: UserName, arg_1: UserWallet) => Promise<[] | [Users]>,
}
