import { FaSquarePlus } from 'react-icons/fa6';
import { Column } from '../types/types';
import TaskCard from './TaskCard';
import { getColorByCategory } from '../utils/getColorByCategory';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';

function ColumnContainer({
  id,
  title,
  tasks,
  category,
  openDialog,
  deleteTask,
}: Column) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'Column',
      category,
    },
  });
  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  return (
    <div
      ref={setNodeRef}
      className='bg-blue-50 rounded-xl shadow-md shadow-blue-300/40 flex flex-col text-gray-900 overflow-hidden dark:bg-gray-800 dark:text-blue-50 dark:shadow-blue-300/20'
    >
      <div
        className={`${
          getColorByCategory(category).background
        } h-1 w-full rounded-tl-md rounded-tr-md `}
      ></div>
      <div className='flex justify-between items-center pr-4 border-b border-blue-100 dark:border-gray-600'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-md font-bold  text-gray-900 pl-4 py-2 mt-1 dark:text-blue-50'>
            {title}
          </h2>
          <div className='h-6 w-6 bg-blue-100 dark:bg-gray-600 rounded-full text-center'>
            <span className='text-sm font-bold '>{tasks.length}</span>
          </div>
        </div>
        <FaSquarePlus
          size={24}
          className='text-gray-900 cursor-pointer hover:scale-[1.05] hover:text-gray-600 transition-all duration-300 dark:text-blue-50'
          onClick={() => openDialog(category)}
        />
      </div>
      {tasks.length > 0 ? (
        <div className='flex flex-col gap-4 p-4 '>
          <SortableContext items={tasksId}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={() => deleteTask(task.id)}
              />
            ))}
          </SortableContext>
        </div>
      ) : (
        <div className='flex flex-col gap-4 p-4 pt-6 pb-6 '>
          <p className='text-sm'>No active tasks for now.</p>
        </div>
      )}
    </div>
  );
}

export default ColumnContainer;
