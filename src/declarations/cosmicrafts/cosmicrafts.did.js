export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const UserWallet = IDL.Text;
  const UserName__1 = IDL.Text;
  const UserWallet__1 = IDL.Text;
  const Users = IDL.Record({ 'user' : UserName__1, 'wallet' : UserWallet__1 });
  return IDL.Service({
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func([UserWallet], [IDL.Bool], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getUser' : IDL.Func([UserWallet], [IDL.Opt(Users)], ['query']),
    'saveUser' : IDL.Func([UserName, UserWallet], [Users], []),
  });
};
export const init = ({ IDL }) => { return []; };
