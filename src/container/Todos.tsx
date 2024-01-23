import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import { Todo, update, remove } from "../store/reducers/todoReducer";
import { useNavigate } from "react-router-dom";

function List() {
  const todos = useSelector<RootState>((state) => state.todo.data) as Todo[];
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      return b.id - a.id;
    });
  }, [todos]);

  const performAction = (id: number, completed: boolean) => {
    dispatch(update({ id, completed: !completed }));
  };

  const doRemove = (id: number) => {
    dispatch(remove(id));
  };

  const doUpdate = (id: number) => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className="todo-list flex justify-center flex-col items-center">
      <div className="App max-w-2lg w-full bg-slate-300 h-[100vh] p-5">
        <div className="flex justify-center">
          <h1 className="font-extrabold font-size text-5xl mt-8">Todo list</h1>
        </div>
        <div className="text-right border-b-2 border-gray-100 pb-2">
          <Link to="/todo/new">
            <button className="button">Create New</button>
          </Link>
        </div>
        <div className="todo-list__items">
          <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1">
            <thead>
              <tr>
                <th className="todo-list__item-header">Title</th>
                <th className="todo-list__item-header">Description</th>
                <th className="todo-list__item-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTodos?.map((todo: Todo) => {
                const { id, title, description, completed } = todo;
                return (
                  <tr
                    key={todo.id}
                    className={`${
                      completed ? "bg-green-300" : "bg-gray-200"
                    } mb-2`}
                  >
                    <td className="w-2/5">
                      <div className="todo-list__info" title={title}>
                        {title}
                      </div>
                    </td>
                    <td className="w-2/5">
                      <div className="list__info" title={description}>
                        {description}
                      </div>
                    </td>
                    <td className="w-1/5">
                      <div className="flex flex-wrap gap-1">
                        <button
                          className={`button mr-1 ${
                            completed ? "!bg-orange-500" : "!bg-green-500"
                          }`}
                          onClick={() => performAction(id, completed)}
                        >
                          {completed ? "Undone" : "Done"}
                        </button>
                        {!completed && (
                          <>
                            <button
                              className="button !bg-red-500"
                              onClick={() => doRemove(id)}
                            >
                              Remove
                            </button>
                            <button
                              className="button"
                              onClick={() => doUpdate(id)}
                            >
                              Update
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;
