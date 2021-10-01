export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const UserWallet = IDL.Text;
  const UserName__1 = IDL.Text;
  const UserWallet__1 = IDL.Text;
  const Users = IDL.Record({ 'user' : UserName__1, 'wallet' : UserWallet__1 });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'status_code' : IDL.Nat16,
  });
  return IDL.Service({
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func([UserWallet], [IDL.Bool], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getUser' : IDL.Func([UserWallet], [IDL.Opt(Users)], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'saveUser' : IDL.Func([UserName, UserWallet], [IDL.Opt(Users)], []),
  });
};
export const init = ({ IDL }) => { return []; };
