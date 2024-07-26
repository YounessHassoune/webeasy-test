import { useContext, createContext, type PropsWithChildren, useState, useMemo } from 'react';

import { useIsFirstTime } from '~/hooks/use-is-first-time';
import useTasks, { type Task } from '~/hooks/use-tasks';
import { filterToStatusMap, taskFilters } from '~/utils/constants';

const StoreContext = createContext<{
  isFirstTime: boolean | null;
  isLoading: boolean;
  updateIsFirstTime: (value: boolean) => Promise<void>;
  tasks: Task[];
  isLoadingTask: boolean;
  addTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTasks: () => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  filteredTasks: Task[];
  updateFilter: (newFilter: string) => void;
  filter: string;
}>({
  isLoading: false,
  isFirstTime: null,
  updateIsFirstTime: async () => {},
  tasks: [],
  isLoadingTask: false,
  addTask: async () => {},
  deleteTask: async () => {},
  getTasks: async () => {},
  updateTask: async () => {},
  filteredTasks: [],
  updateFilter: () => {},
  filter: '',
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
  const [filter, setFilter] = useState<string>(taskFilters[0]);

  // Function to update the filter
  const updateFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Filtered tasks based on the filter state
  const filteredTasks = useMemo(() => {
    const statusFilter = filterToStatusMap[filter];
    if (statusFilter === 'All') {
      return tasks;
    }
    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, filter]);

  return (
    <StoreContext.Provider
      value={{
        //onboarding data
        isFirstTime,
        isLoading,
        updateIsFirstTime,
        //tasks data
        tasks,
        isLoadingTask,
        addTask,
        deleteTask,
        getTasks,
        updateTask,
        //filter data
        filter,
        filteredTasks,
        updateFilter,
      }}>
      {children}
    </StoreContext.Provider>
  );
}
