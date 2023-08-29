'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Task } from '@/lib/types';

type TasksContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TasksContext = createContext<TasksContextType | null>(null);

export function TasksContextProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      'useTasksContext nust be used within an TasksContextProvider'
    );
  }

  return context;
}
