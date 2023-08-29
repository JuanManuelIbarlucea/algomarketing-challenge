import TaskDisplay from '@/components/task-display';
import TaskForm from '@/components/task-form';

export default function Home() {
  return (
    <main className="flex gap-5 w-full flex-col md:flex-row justify-center items-center h-[40rem]">
      <TaskForm />
      <TaskDisplay />
    </main>
  );
}
