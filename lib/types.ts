export const Types = ['Work', 'Personal', 'Health', 'Other'] as const;
export const Labels = ['Urgent', 'Can be postponed', 'Not important'] as const;

export type TaskType = (typeof Types)[number];
export type LabelsType = (typeof Labels)[number];

export type Task = {
  _id?: string;
  name: string;
  description: string;
  type: TaskType;
  dueDate: Date;
  label: LabelsType;
};
