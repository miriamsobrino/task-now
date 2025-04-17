import { HiOutlineTrash } from 'react-icons/hi2';
import { getColorByCategory } from '../utils/getColorByCategory';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCardProps } from '../types/types';

function TaskCard({ task, deleteTask }: TaskCardProps) {
  const { border, hover, background } = getColorByCategory(task.category);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={` py-4  ${background} dark:bg-gray-600 opacity-30 `}
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={` ${border} ${hover} px-1 py-2 flex bg-blue-50 dark:bg-gray-800 justify-between items-center transition-all duration-50 dark:hover:bg-gray-600 cursor-grab `}
    >
      <span className='text-sm px-1'>{task.title}</span>
      <HiOutlineTrash
        className='cursor-pointer hover:scale-[1.05] transition-all duration-300'
        onClick={() => deleteTask(task.id)}
      />
    </div>
  );
}

export default TaskCard;
