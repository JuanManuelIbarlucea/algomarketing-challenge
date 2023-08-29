'use client';
import useTasksContext from '@/contexts/tasks-context';
import { Task, TaskType } from '@/lib/types';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm() {
  type SingleTaskType = (typeof TaskType)[number];
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<SingleTaskType>('Work');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const { setTasks } = useTasksContext();

  function createTask(ev: FormEvent) {
    ev.preventDefault();

    const newTask: Task = {
      name,
      description,
      type,
      dueDate,
    };

    setTasks((prev) => {
      return [...prev, newTask];
    });
  }

  return (
    <div className="w-full h-full bg-white rounded-l-xl p-5 ">
      <h1>Task Form</h1>
      <form className="flex flex-col m-auto" onSubmit={createTask}>
        <label>Product name</label>
        <input
          value={name}
          type="text"
          placeholder="Task Name"
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          placeholder="Task Description"
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Type</label>
        <select
          value={type}
          onChange={(ev) => setType(ev.target.value as SingleTaskType)}
        >
          {TaskType.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <div className="flex flex-col">
          <label>Due Date</label>
          <DatePicker
            showIcon
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="btn-green">
            Save
          </button>
          <button type="button" className="btn-red">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
