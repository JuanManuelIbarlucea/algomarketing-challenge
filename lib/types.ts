export const TaskType = ['Work', 'Personal', 'Health', 'Other'] as const;

export type Task = {
  name: string;
  description: string;
  type: (typeof TaskType)[number];
  dueDate: Date;
};
