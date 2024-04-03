import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../../Components/Heading/Heading";
import { SearchIcon } from "../../assets/icons/icons";
import Button from "../../Components/Buttons/Button";
import { Navigate } from "react-router-dom";
import {
  ErrorToast,
  InfoToast,
  WarnToast,
} from "../../Components/Toasts/toastContainer";
import sampleImg from "../../assets/images/sampleImg.png";
import TodoCard from "../../Components/TodoCard/todo-card";
import AddModal from "../../Components/TodoModals/add-modal";
import { AnimatePresence } from "framer-motion";
import Loader from "../../Components/Loaders/loading-anime";

export default function TodoContainer() {
  const token = JSON.parse(localStorage.getItem("token")) ?? null;
  const [isClicked, setIsClicked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [tempTodos, setTempTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function getTodos() {
      try {
        InfoToast({ message: "Please Wait!" });
        const resp = await axios.get("http://localhost:4000/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = resp?.data;
        InfoToast({ message: "Fetched Successfully.." });
        if (data.todos.length === 0) {
          WarnToast({ message: "No Todos Found" });
        }
        setTodos(data?.todos);
        setTempTodos(data?.todos);
      } catch (err) {
        console.log(err.message);
        ErrorToast(err.message);
      }
    }
    getTodos();
  }, [isAdded]);

  if (!token) {
    return (
      <>
        {ErrorToast("Not Authorized ")}
        <Navigate to={"/login"} />
      </>
    );
  }

  const people = [
    {
      id: 1,
      name: "You",
      designation: "Software Engineer",
      image: sampleImg,
    },
  ];

  function handleClick(e) {
    const newTodos = tempTodos.filter(
      (ele) => ele.status.toLowerCase() === e.target.id.toLowerCase()
    );
    setTodos(newTodos);
  }

  function filterTodos(e) {
    const value = e.target.value;
    const newTodos = tempTodos.filter((ele) =>
      ele.desc.toLowerCase().includes(value.trim().toLowerCase())
    );
    setTodos(newTodos);
  }

  return (
    <div className="main-container w-full flex flex-col light_bg">
      <div className="heading-container">
        <Heading
          heading="slog board"
          subheading="Forget your to-be list and create a to-do list."
        />
        <hr />
      </div>
      <div className="filter-div flex mt-4 w-full items-center justify-center">
        <div className="flex gap-5 w-[45%] relative">
          <SearchIcon className={"absolute top-[20%] left-[2%]"} />
          <input
            type="text"
            placeholder="Search something ..."
            className="border border-slate-400 w-[80%] py-[0.5rem] px-[3.8rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md outline-none"
            onChange={filterTodos}
          />
          <Button
            onclkFn={() => setIsClicked(true)}
            text="Add Task"
            color="bg-indigo-500"
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : todos.length === 0 || isLoading ? (
        <h1>No Todos Found</h1>
      ) : (
        <div className="body-div grid grid-cols-12 gap-[1rem] p-4 ">
          <TodoCard
            links={people}
            isClicked={isClicked}
            todos={todos}
            handleClick={handleClick}
          />
        </div>
      )}
      <AnimatePresence>
        {isClicked && (
          <AddModal clkFn={setIsClicked} isAdded={isAdded} addFn={setIsAdded} />
        )}
      </AnimatePresence>
    </div>
  );
}
