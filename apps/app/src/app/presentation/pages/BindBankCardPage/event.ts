export const BindBankCardPageEvents = {
  UserBindBankcard: {
    name: 'UserBindBankcard',
    setTags: (
      status: 'loading' | 'success' | 'failure',
      args: Record<string, any>
    ) => {
      return {
        status: status,
        ...args,
      };
    },
  },
};
