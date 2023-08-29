import { Labels, Task, TaskType } from '@/lib/types';
import { twMerge } from 'tailwind-merge';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  function getTypeColor(type: (typeof TaskType)[number]) {
    if (type === 'Health') return '#424632';
    if (type === 'Personal') return '#252850';
    if (type === 'Work') return '#721422';
    if (type === 'Other') return '#E55137';

    return '#fff';
  }
  function getLabelColor(label: (typeof Labels)[number]) {
    if (label === 'Urgent') return 'bg-rose-700';
    if (label === 'Can be postponed') return 'bg-amber-700';
    if (label === 'Not important') return 'bg-cyan-700';

    return '#fff';
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks?.map((task) => (
        <li className="bg-white rounded-xl p-5 text-ellipsis shadow-xl relative overflow-hidden">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <p className="align-middle font-bold">
              {task.dueDate.toDateString()}
            </p>
          </div>
          <p
            style={{ backgroundColor: getTypeColor(task.type) }}
            className={`w-[5rem] text-center rounded-full p-1 text-sm my-2 text-white`}
          >
            {task.type}
          </p>
          <p className="text-xl">{task.name}</p>
          <p className="text-sm">{task.description}</p>
          <p
            className={twMerge(
              'text-white absolute p-2 top-[2rem] -right-[7rem] rotate-45 bg-red-700 w-[20rem] text-center text-sm',
              getLabelColor(task.label)
            )}
          >
            {task.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
