import useTasksContext from '@/contexts/tasks-context';
import { LabelsType, Task, TaskType } from '@/lib/types';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';

export default function TaskCard({ task }: { task: Task }) {
  function getTypeColor(type: TaskType) {
    if (type === 'Health') return '#424632';
    if (type === 'Personal') return '#252850';
    if (type === 'Work') return '#721422';
    if (type === 'Other') return '#E55137';

    return '#fff';
  }
  function getLabelColor(label: LabelsType) {
    if (label === 'Urgent') return 'bg-rose-700';
    if (label === 'Can be postponed') return 'bg-amber-700';
    if (label === 'Not important') return 'bg-cyan-700';

    return '#fff';
  }

  const dueDate = new Date(task.dueDate);
  const { setTasks } = useTasksContext();

  async function deleteTask() {
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
    await axios.delete(`/api/tasks?id=${task._id}`);
  }

  return (
    <div className="bg-white rounded-xl p-5 text-ellipsis shadow-xl relative overflow-hidden">
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
        <p className="align-middle font-bold">Due: {dueDate.toDateString()}</p>
      </div>
      <p
        style={{ backgroundColor: getTypeColor(task.type) }}
        className={`w-[5rem] text-center rounded-full p-1 text-sm my-2 text-white`}
      >
        {task.type}
      </p>
      <p className="text-xl font-bold uppercase break-word">{task.name}</p>
      <p className="text-sm break-words">{task.description}</p>

      <div
        className="absolute bg-red-500  rounded-tr-xl p-2 top-0 right-0 cursor-pointer"
        onClick={deleteTask}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>

      <div
        className={twMerge(
          'text-white absolute p-2 top-[2rem] -right-[7rem] rotate-45 bg-red-700 w-[20rem] text-center text-sm overflow-hidden',
          getLabelColor(task.label)
        )}
      >
        {task.label}
      </div>
    </div>
  );
}
