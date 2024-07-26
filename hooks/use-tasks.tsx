import { useEffect, useState } from 'react';

import { getItem, setItem } from '~/utils/storage';

export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'PROGRESS' | 'DONE';
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Function to get all tasks
  const getTasks = async () => {
    setIsLoading(true);
    const tasks = await getItem<Task[]>('@tasks');
    setTasks(tasks ?? []);
    setIsLoading(false);
  };

  //Function to save tasks
  const saveTasks = async (newtasks: Task[]) => {
    setIsLoading(true);
    await setItem('@tasks', newtasks);
    setTasks(newtasks);
    setIsLoading(false);
  };

  //Function to add a task
  const addTask = async (task: Task) => {
    setIsLoading(true);
    const newTasks = [...tasks, task];
    await saveTasks(newTasks);
    setIsLoading(false);
  };

  // Function to delete a task
  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    const newTasks = tasks.filter((task) => task.id !== taskId);
    await saveTasks(newTasks);
    setIsLoading(false);
  };

  // Function to update a task
  const updateTask = async (updatedTask: Task) => {
    setIsLoading(true);
    const newTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    await saveTasks(newTasks);
    setIsLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return {
    tasks,
    isLoading,
    addTask,
    deleteTask,
    updateTask,
    getTasks,
  };
};

export default useTasks;
