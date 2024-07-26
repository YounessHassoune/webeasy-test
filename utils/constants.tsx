import { TaskStatus } from '~/hooks/use-tasks';

export const taskFilters = ['All', 'In Progress', 'Done'];
export const taskFilterIcons: { [key: string]: string } = {
  All: 'format-list-bulleted',
  'In Progress': 'progress-clock',
  Done: 'check-circle-outline',
};
export const taskCardIcon = {
  [TaskStatus.PROGRESS]: 'progress-clock',
  [TaskStatus.DONE]: 'check-circle-outline',
};

export const filterToStatusMap: Record<string, TaskStatus | 'All'> = {
  All: 'All',
  'In Progress': TaskStatus.PROGRESS,
  Done: TaskStatus.DONE,
};
