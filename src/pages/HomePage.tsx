import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import {
  db,
  get,
  ref,
  set,
  update,
  remove,
  onValue,
} from '../config/firebaseConfig';
import { getColorByCategory } from '../utils/getColorByCategory';
import ColumnContainer from '../components/ColumnContainer';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Task } from '../types/types';
import TaskCard from '../components/TaskCard';
import { createPortal } from 'react-dom';
import { arrayMove } from '@dnd-kit/sortable';

function HomePage() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { user } = useAuth();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    if (!user) return;
    const tasksRef = ref(db, `tasks/${user.uid}`);
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedTasks: Task[] = Object.values(data);
        setTasks(loadedTasks.reverse());
      } else {
        setTasks([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const openDialog = (category: string) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const dialogClose = () => {
    setIsDialogOpen(false);
    setNewTaskTitle('');
    setSelectedCategory('');
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    const newTaskId = uuidv4();
    const newTask = {
      id: newTaskId,
      title: newTaskTitle,
      category: selectedCategory,
    };
    const taskRef = ref(db, `tasks/${user?.uid}/${newTaskId}`);
    await set(taskRef, newTask);
    //setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskTitle('');
    setIsDialogOpen(false);
    setSelectedCategory('');
  };
  const toDoTasks = tasks.filter((task) => task.category === 'to-do');
  const inProgressTasks = tasks.filter(
    (task) => task.category === 'in-progress'
  );
  const completedTasks = tasks.filter((task) => task.category === 'completed');

  const deleteTask = async (taskId: string) => {
    if (!user?.uid) {
      return;
    }

    try {
      const taskRef = ref(db, `tasks/${user?.uid}/${taskId}`);
      await remove(taskRef);
    } catch {
      // sooner
    }
    const filteredTask = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTask);
  };

  const getCategory = (selectedCategory: string) => {
    switch (selectedCategory) {
      case 'to-do':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Default';
    }
  };
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Tarea sobre otra tarea
    if (isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (
          activeIndex === -1 ||
          overIndex === -1 ||
          (tasks[activeIndex].category === tasks[overIndex].category &&
            activeIndex === overIndex)
        ) {
          return tasks;
        }

        const sameCategory =
          tasks[activeIndex].category === tasks[overIndex].category;

        if (!sameCategory) {
          const taskRef = ref(db, `tasks/${user?.uid}/${activeId}`);
          update(taskRef, { category: tasks[overIndex].category });
        }

        const updatedTasks = [...tasks];
        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          category: updatedTasks[overIndex].category,
        };

        return arrayMove(updatedTasks, activeIndex, overIndex);
      });
    }

    // Tarea sobre una columna vacía
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newCategory = over.data.current?.category;

        if (activeIndex === -1) return tasks;

        if (tasks[activeIndex].category === newCategory) return tasks;

        const updatedTask = {
          ...tasks[activeIndex],
          category: newCategory,
        };
        const taskRef = ref(db, `tasks/${user?.uid}/${activeId}`);
        update(taskRef, { category: newCategory });

        const updatedTasks = [...tasks];
        updatedTasks.splice(activeIndex, 1);
        updatedTasks.push(updatedTask);

        return updatedTasks;
      });
    }
  };

  return (
    <div className='w-full relative z-10 justify-start items-center h-screen pt-16 flex flex-col gap-4  bg-blue-100  font-montserrat dark:bg-gray-900 '>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-12 h-auto w-[70%] '>
          <ColumnContainer
            id='to-do'
            title='To Do'
            tasks={toDoTasks}
            category='to-do'
            openDialog={() => openDialog('to-do')}
            deleteTask={deleteTask}
          />

          <ColumnContainer
            id='in-progress'
            title='In Progress'
            tasks={inProgressTasks}
            category='in-progress'
            openDialog={() => openDialog('in-progress')}
            deleteTask={deleteTask}
          />

          <ColumnContainer
            id='completed'
            title='Completed'
            tasks={completedTasks}
            category='completed'
            openDialog={() => openDialog('completed')}
            deleteTask={deleteTask}
          />
        </div>
        {createPortal(
          <DragOverlay className='font-montserrat'>
            {activeTask && (
              <TaskCard task={activeTask} deleteTask={deleteTask} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      {isDialogOpen &&
        createPortal(
          <dialog
            open={isDialogOpen}
            onClick={dialogClose}
            className='fixed inset-0 w-full h-full bg-black/40 flex justify-center items-center z-50 font-montserrat'
          >
            <div
              className='bg-sky-100 rounded-lg p-6 w-96 shadow-lg dark:bg-gray-800'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-semibold  text-gray-900 dark:text-blue-50'>
                  Add new task
                </h3>
                <div className='flex gap-2 items-center'>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      getColorByCategory(selectedCategory).background
                    }`}
                  ></div>
                  <span className='text-sm text-gray-900 dark:text-blue-50 '>
                    {getCategory(selectedCategory)}
                  </span>
                </div>
              </div>

              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTask();
                  }
                }}
                placeholder='Task title'
                className={`w-full text-gray-900 px-3 py-2 rounded-md mb-4 outline-none border-2  border-blue-200 dark:text-blue-50`}
              />
              <div className='flex justify-end gap-2'>
                <Button
                  variant='secondary'
                  size='small'
                  className='bg-transparent '
                  onClick={dialogClose}
                >
                  Cancel
                </Button>
                <Button variant='primary' size='small' onClick={addTask}>
                  Add
                </Button>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </div>
  );
}

export default HomePage;
