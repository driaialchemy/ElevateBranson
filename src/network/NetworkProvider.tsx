import NetInfo from '@react-native-community/netinfo';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type NetworkValue = {
  online: boolean;
  refresh: () => Promise<void>;
};

const NetworkContext = createContext<NetworkValue>({
  online: true,
  refresh: async () => {},
});

function isOnline(state: { isConnected?: boolean | null; isInternetReachable?: boolean | null }) {
  if (state.isConnected === false) {
    return false;
  }
  if (state.isInternetReachable === false) {
    return false;
  }
  return true;
}

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(true);

  const refresh = useCallback(async () => {
    const state = await NetInfo.fetch();
    setOnline(isOnline(state));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnline(isOnline(state));
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ online, refresh }), [online, refresh]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useNetwork() {
  return useContext(NetworkContext);
}
