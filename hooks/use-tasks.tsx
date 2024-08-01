import { useEffect, useState } from 'react';

import { getItem, setItem } from '~/utils/storage';

export enum TaskStatus {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: '🛒 Grocery Shopping',
    description: 'Buy milk 🥛, eggs 🥚, and bread 🍞',
    date: new Date('2024-08-01T10:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '2',
    title: '📚 Read a Book',
    description: 'Finish reading "The Great Gatsby" 📖',
    date: new Date('2024-08-02T15:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '3',
    title: '🏋️‍♂️ Gym Workout',
    description: 'Complete upper body workout 💪',
    date: new Date('2024-08-03T08:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '4',
    title: '💻 Code Review',
    description: 'Review pull requests on GitHub 🔍',
    date: new Date('2024-08-03T13:00:00'),
    status: TaskStatus.DONE,
  },
  {
    id: '5',
    title: '🌳 Nature Walk',
    description: 'Go for a walk in the park 🌿',
    date: new Date('2024-08-04T17:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '6',
    title: '🍔 Lunch with Friends',
    description: 'Meet at the new burger place 🍔',
    date: new Date('2024-08-05T12:30:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '7',
    title: '📝 Write Blog Post',
    description: 'Draft a new post about web development 🖥️',
    date: new Date('2024-08-06T10:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '8',
    title: '✈️ Book Flight',
    description: 'Book tickets to Paris ✈️',
    date: new Date('2024-08-07T09:00:00'),
    status: TaskStatus.DONE,
  },
  {
    id: '9',
    title: '🎵 Music Practice',
    description: 'Practice guitar chords 🎸',
    date: new Date('2024-08-08T14:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '10',
    title: '🍿 Movie Night',
    description: 'Watch "Inception" with popcorn 🍿',
    date: new Date('2024-08-09T20:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '11',
    title: '🧹 Clean House',
    description: 'Vacuum and dust the living room 🧽',
    date: new Date('2024-08-10T11:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '12',
    title: '🛠️ Fix Leak',
    description: 'Repair the leaking faucet in the kitchen 🔧',
    date: new Date('2024-08-11T09:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '13',
    title: '🎨 Paint Room',
    description: 'Finish painting the bedroom walls 🎨',
    date: new Date('2024-08-12T14:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '14',
    title: '🍰 Bake Cake',
    description: 'Bake a chocolate cake for the party 🎂',
    date: new Date('2024-08-13T16:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '15',
    title: '📈 Update Budget',
    description: 'Review and update monthly budget 📊',
    date: new Date('2024-08-14T12:00:00'),
    status: TaskStatus.DONE,
  },
  {
    id: '16',
    title: '🚗 Car Maintenance',
    description: 'Get the oil changed and tires checked 🛠️',
    date: new Date('2024-08-15T10:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '17',
    title: '🎤 Karaoke Night',
    description: 'Host a karaoke night with friends 🎤',
    date: new Date('2024-08-16T19:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '18',
    title: '📅 Plan Vacation',
    description: 'Organize itinerary and book accommodations 🗺️',
    date: new Date('2024-08-17T13:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '19',
    title: '💧 Water Plants',
    description: 'Water the garden and houseplants 🌿',
    date: new Date('2024-08-18T08:00:00'),
    status: TaskStatus.PROGRESS,
  },
  {
    id: '20',
    title: '🛌 Bedtime Routine',
    description: 'Prepare for bed and read a book 📚',
    date: new Date('2024-08-19T22:00:00'),
    status: TaskStatus.PROGRESS,
  },
];

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Function to get all tasks
  const getTasks = async () => {
    await setItem('@tasks', initialTasks);
    setIsLoading(true);
    const tasks = await getItem<Task[]>('@tasks');
    if (tasks && tasks.length > 0) {
      setTasks(tasks);
    } else {
      await setItem('@tasks', initialTasks);
      setTasks(initialTasks);
    }
    // setTasks(tasks ?? []);
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
