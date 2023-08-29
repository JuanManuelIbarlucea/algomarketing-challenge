'use client';
import useTasksContext from '@/contexts/tasks-context';
import TaskList from './task-list';
import { useEffect, useState } from 'react';
import { Labels, LabelsType, Task } from '@/lib/types';

export default function TaskDisplay() {
  const SortKeys = ['Date', 'Type', 'Label'] as const;
  type SortTypes = (typeof SortKeys)[number];
  const { tasks } = useTasksContext();
  const [labelFilter, setLabelFilter] = useState<LabelsType | null>(null);
  const [curatedTasks, setCuratedTasks] = useState<Task[]>(tasks);
  const [sortKey, setSortKey] = useState<SortTypes>('Date');

  useEffect(() => {
    if (!labelFilter || labelFilter === undefined) {
      setCuratedTasks(tasks);
    } else {
      setCuratedTasks(tasks.filter((task) => task.label === labelFilter));
    }
  }, [labelFilter, tasks]);

  useEffect(() => {
    if (sortKey === 'Date') {
      setCuratedTasks((prev) =>
        prev.sort((a, b) => {
          const aDate = new Date(a.dueDate);
          const bDate = new Date(b.dueDate);

          if (aDate.getTime() === bDate.getTime()) return 0;
          return aDate.getTime() < bDate.getTime() ? -1 : 1;
        })
      );
    } else if (sortKey === 'Label') {
      setCuratedTasks((prev) =>
        prev.sort((a, b) => {
          if (a.label === b.label) return 0;
          return a.label < b.label ? -1 : 1;
        })
      );
    } else if (sortKey === 'Type') {
      setCuratedTasks((prev) =>
        prev.sort((a, b) => {
          if (a.type === b.type) return 0;
          return a.type < b.type ? -1 : 1;
        })
      );
    }
  }, [sortKey, tasks]);

  return (
    <div className="relative bg-primary w-full h-full text-[#222] p-5 overflow-auto scrollbar-thumb-gray-900 scrollbar-thin scrollbar-track-gray-100">
      <div className="flex gap-3 ri fixed bg-white rounded-lg p-2 z-10 border border-black">
        <div className="relative">
          <label className="absolute -top-1 left-0 bg-white rounded-lg">
            Label
          </label>
          <select
            className="m-0"
            value={labelFilter || ''}
            onChange={(ev) => setLabelFilter(ev.target.value as LabelsType)}
          >
            <option value={''} />
            {Labels.map((label) => {
              return (
                <option key={label} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative">
          <label className="absolute -top-2 left-0 bg-white rounded-lg">
            Filter By
          </label>
          <select
            className="m-0"
            value={sortKey || ''}
            onChange={(ev) => setSortKey(ev.target.value as SortTypes)}
          >
            {SortKeys.map((key) => {
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-[5rem]">
        <TaskList tasks={curatedTasks} />
      </div>
    </div>
  );
}
