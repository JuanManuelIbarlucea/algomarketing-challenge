export const TaskType = ['Work', 'Personal', 'Health', 'Other'] as const;
export const Labels = ['Urgent', 'Can be postponed', 'Not important'] as const;

export type Task = {
  name: string;
  description: string;
  type: (typeof TaskType)[number];
  dueDate: Date;
  label: (typeof Labels)[number];
};
