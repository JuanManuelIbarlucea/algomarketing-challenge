'use client';
import useTasksContext from '@/contexts/tasks-context';
import { mockTasks } from '@/lib/mocks';
import TaskList from './task-list';

export default function TaskDisplay() {
  const { tasks } = useTasksContext();

  return (
    <div className="bg-primary w-full h-full text-[#222] p-5 overflow-auto scrollbar-thumb-gray-900 scrollbar-thin scrollbar-track-gray-100">
      <TaskList tasks={tasks} />
    </div>
  );
}
