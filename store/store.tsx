import { useContext, createContext, type PropsWithChildren } from 'react';

import { useIsFirstTime } from '~/hooks/use-is-first-time';
import useTasks from '~/hooks/use-tasks';

const StoreContext = createContext<{
  isFirstTime: boolean | null;
  isLoading: boolean;
  updateIsFirstTime: (value: boolean) => Promise<void>;
}>({
  isLoading: false,
  isFirstTime: null,
  updateIsFirstTime: async () => {},
});

export function useStore() {
  const value = useContext(StoreContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useStore must be wrapped in a <StoreProvider />');
    }
  }
  return value;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const { isFirstTime, isLoading, updateIsFirstTime } = useIsFirstTime();
  const { tasks, isLoading: isLoadingTask, addTask, deleteTask, getTasks, updateTask } = useTasks();

  return (
    <StoreContext.Provider
      value={{
        isFirstTime,
        isLoading,
        updateIsFirstTime,
      }}>
      {children}
    </StoreContext.Provider>
  );
}
