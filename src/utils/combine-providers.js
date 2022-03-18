import * as React from 'react';

const combineProviders = providers => {
  return ({ children }) => {
    return providers.reduce((tree, ProviderOrWithValue) => {
      if (Array.isArray(ProviderOrWithValue)) {
        const [Provider, value] = ProviderOrWithValue;
        return <Provider {...value}>{tree}</Provider>;
      } else {
        return <ProviderOrWithValue>{tree}</ProviderOrWithValue>;
      }
    }, children);
  };
};

export default combineProviders;
