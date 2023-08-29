import { Task } from '@/lib/types';
import TaskCard from './task-card';
import { mockTasks } from '@/lib/mocks';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {tasks?.map((task) => (
        <li key={task._id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
