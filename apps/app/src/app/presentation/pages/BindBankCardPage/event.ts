export const BindBankCardPageEvents = {
  UserBindBankcard: {
    name: 'UserBindBankcard',
    getTags: (
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
