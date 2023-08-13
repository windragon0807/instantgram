import { createContext, useContext } from 'react';

type CacheKeysValue = {
  postsKey: string;
};

// https://react.dev/learn/passing-data-deeply-with-context
export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CacheKeysContext);
