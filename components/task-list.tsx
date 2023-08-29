import { Task } from '@/lib/types';
import TaskCard from './task-card';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {tasks?.map((task) => (
        <li>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
