import React, { useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { v1 as uuid } from "uuid";
import { Todo, create, update } from "../store/reducers/todoReducer";
import { RootState } from "../store";

type Inputs = {
  id?: number;
  title: string;
  description: string;
};

const Form = () => {
  const params = useParams();
  const navigate = useNavigate();
  const todos = useSelector<RootState>((state) => state.todo.data) as Todo[];

  const initialState = useMemo(() => {
    return params?.id
      ? todos.find((todo) => todo.id === Number(params.id))
      : { title: "", description: "" };
  }, []);

  const {
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<Inputs>({
    values: initialState,
  });

  const isError = Object.keys(errors)?.length !== 0;

  const dispatch = useDispatch();
  const formValues = watch();

  useEffect(() => {
    if (!formValues.title && !errors?.title) {
      setError("title", { message: "This field is required!" });
    } else if (formValues.title && errors.title) {
      clearErrors("title");
    }

    if (!formValues.description && !errors?.description) {
      setError("description", { message: "This field is required!" });
    } else if (formValues.description && errors.description) {
      clearErrors("description");
    }
  }, [formValues?.title, formValues?.description]);

  const doSubmit = (values: Inputs) => {
    const todo = { ...values, id: Number(params?.id) };
    const func = params?.id ? update : create;
    dispatch(func(todo));
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <div className="flex justify-start flex-col bg-slate-300 sm:h-96 md:h-96 rounded-lg shadow-lg p-6 relative">
        <div className="absolute -mt-12 -ml-6">
          <Link to="/">{`< Back`}</Link>
        </div>
        <div className="font-extrabold sm:text-5xl flex justify-center flex-wrap text-4xl">
          Create new task
        </div>

        <form onSubmit={handleSubmit(doSubmit)}>
          <Input label="Title" control={control} name="title" />

          <TextArea label="Description" control={control} name="description" />

          <div className="btn mt-4 px-6">
            <button
              type="submit"
              className="button"
              disabled={!isValid || isSubmitting || !isDirty || isError}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
