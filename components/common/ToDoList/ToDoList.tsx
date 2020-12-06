/* eslint-disable indent */
import { FC, useEffect } from 'react';
import { CheckIcon, CrossIcon } from '@components/icons';
import { ToDoItemModel, useToDo, View } from '@components/context/context';

const ToDoList: FC = (): JSX.Element => {
  const {
    toDoItems,
    toDoToShow,
    view,
    deleteToDo,
    toggleToDo,
    getToDoAll,
    getToDoActive,
    getToDoCompleted,
  } = useToDo();

  const handleClick = (value: View): any => {
    switch (value) {
      case 'all': {
        return getToDoAll();
      }

      case 'active': {
        return getToDoActive();
      }

      case 'completed': {
        return getToDoCompleted();
      }
    }
  };

  useEffect(() => {
    handleClick(view);
    return (): any => handleClick(view);
  }, [toDoItems, view]);

  return (
    <ul className="bg-white w-full mt-4 rounded-t">
      {toDoToShow.map((toDo: ToDoItemModel) => (
        <li key={toDo.id} className="p-4 border-b hover:shadow">
          <div className={`flex ${toDo.isDone && 'line-through text-gray-300'}`}>
            <button
              type="button"
              className={`${
                toDo.isDone
                  ? 'text-white bg-gradient-to-r from-lightskyblue to-mediumorchid'
                  : 'text-gray-300'
              } flex justify-center items-center max-w-2xs w-full h-6 mr-2 text-center border border-gray-300 border-solid rounded-full hover:outline-none focus:outline-none`}
              onClick={(): any => {
                toggleToDo(toDo.id);
              }}
            >
              <CheckIcon className={toDo.isDone ? 'stroke-2' : ''} />
            </button>

            <p className="flex-1">{toDo.task}</p>

            <button
              type="button"
              className="max-w-2xs w-full ml-2 text-gray-300 text-center rounded-full hover:outline-none focus:outline-none"
              onClick={(): any => deleteToDo(toDo.id)}
            >
              <CrossIcon />
            </button>
          </div>
        </li>
      ))}

      <li className="border-b flex justify-between mt-1 p-4 text-gray-400">
        <p>{toDoToShow.length} items left</p>
        <p>clear completed</p>
      </li>
    </ul>
  );
};

export default ToDoList;
