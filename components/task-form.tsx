'use client';
import useTasksContext from '@/contexts/tasks-context';
import {
  isDueAfterDays,
  isDueTomorrow,
  isDueWithinDays,
  isDueWithinMonths,
} from '@/lib/helpers';
import { LabelsType, Task, TaskType, Types } from '@/lib/types';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<TaskType>('Work');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const { setTasks } = useTasksContext();

  function getTaskLabel(): LabelsType {
    switch (type) {
      case 'Work':
        if (isDueTomorrow(dueDate)) {
          return 'Urgent';
        } else if (
          ['PLO', 'GJL'].some((s) => name.includes(s)) &&
          isDueWithinMonths(dueDate)
        ) {
          return 'Can be postponed';
        }
        break;
      case 'Health':
        if (
          !name.toLowerCase().includes('treatment') &&
          isDueWithinDays(dueDate, 3)
        ) {
          return 'Urgent';
        }
        break;
      case 'Personal':
        if (isDueWithinMonths(dueDate)) {
          return 'Can be postponed';
        }
        break;
      case 'Other':
        if (isDueWithinDays(dueDate, 5)) {
          return 'Can be postponed';
        }

        if (isDueAfterDays(dueDate, 7)) {
          return 'Not important';
        }

        if (dueDate === null || dueDate === undefined) {
          return 'Not important';
        }
        break;
    }

    return 'Not important';
  }

  async function createTask(ev: FormEvent) {
    ev.preventDefault();

    const { data } = await axios.post('/api/tasks', {
      name,
      description,
      type,
      dueDate,
      label: getTaskLabel(),
    });

    setTasks((prev) => {
      return [...prev, data];
    });
  }

  return (
    <div className="w-full h-full bg-white rounded-l-xl p-5 ">
      <h1>Task Form</h1>
      <form className="flex flex-col h-full m-auto" onSubmit={createTask}>
        <label>Product name</label>
        <input
          value={name}
          type="text"
          placeholder="Task Name"
          required
          maxLength={50}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          className="h-[15rem] resize-none"
          value={description}
          placeholder="Task Description"
          required
          maxLength={500}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Type</label>
        <select
          value={type}
          onChange={(ev) => setType(ev.target.value as TaskType)}
        >
          {Types.map((type) => {
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
            startDate={new Date()}
            showIcon
            selected={dueDate}
            minDate={new Date()}
            onChange={(date: Date) => setDueDate(date)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="btn-green">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
