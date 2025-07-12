export const idlFactory = ({ IDL }) => {
  const Operation = IDL.Variant({
    'burn' : IDL.Null,
    'init' : IDL.Null,
    'mint' : IDL.Null,
    'approve' : IDL.Null,
    'transfer' : IDL.Null,
  });
  const Status = IDL.Variant({ 'success' : IDL.Null, 'failed' : IDL.Null });
  const Time = IDL.Int;
  const OpRecord = IDL.Record({
    'op' : Operation,
    'to' : IDL.Opt(IDL.Text),
    'fee' : IDL.Opt(IDL.Nat64),
    'status' : Status,
    'from' : IDL.Opt(IDL.Text),
    'hash' : IDL.Text,
    'memo' : IDL.Opt(IDL.Nat64),
    'timestamp' : Time,
    'caller' : IDL.Text,
    'index' : IDL.Nat,
    'amount' : IDL.Nat64,
  });
  const Account = IDL.Record({ 'hash' : IDL.Vec(IDL.Nat8) });
  const Metadata = IDL.Record({
    'fee' : IDL.Nat,
    'decimals' : IDL.Nat64,
    'owner' : Account,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat64,
    'symbol' : IDL.Text,
  });
  const Token = IDL.Service({
    'allHistory' : IDL.Func([], [IDL.Vec(OpRecord)], ['query']),
    'allowance' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat64], ['query']),
    'approve' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Bool, IDL.Text], []),
    'balanceOf' : IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
    'burn' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Bool, IDL.Text], []),
    'decimals' : IDL.Func([], [IDL.Nat64], ['query']),
    'getHistoryByAccount' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Vec(OpRecord))],
        ['query'],
      ),
    'getHistoryByHash' : IDL.Func([IDL.Text], [IDL.Opt(OpRecord)], ['query']),
    'metadata' : IDL.Func([], [Metadata], ['query']),
    'mint' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Bool, IDL.Text], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Text], ['query']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat64], ['query']),
    'transfer' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Bool, IDL.Text], []),
    'transferFrom' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64],
        [IDL.Bool, IDL.Text],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return Token;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Nat64, IDL.Nat64];
};
