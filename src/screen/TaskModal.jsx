import { useState } from "react";
import { BiSolidEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiX } from 'react-icons/fi';

function TaskModal() {
  const [todo, setTodo] = useState([])
  const [value, setValue] = useState('')


  const addTask = () => {
    if (value.trim() !== '') {
      setTodo([...todo, value]);
      setValue('');
    }
  };

  const removeTask = (index) => {
    const updatedTask = todo.filter((_, i) => i !== index);
    setTodo(updatedTask)
  }

  const editTask = (index, newTask) => {
    const updatedTasks = [...todo];
    updatedTasks[index] = newTask;
    setTodo(updatedTasks);
  };


  return (
    <div className="w-full h-[100vh]  items-center  bg-gray-800 bg-opacity-50  flex justify-center">

      {/* <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center "> */}


      <div className="w-[90vw] sm:w-[50vw] h-[32rem] flex flex-col p-8 bg-white justify-start items-center rounded-lg shadow-8xl max-w-md m-auto transform transition-all duration-300 hover:shadow-4xl">
        <Link to="/auxibot">
          <div className="p-2 mb-2 cursor-pointer absolute  top-2 left-2" >
            <FiX className="text-black  text-lg " />
          </div>
        </Link>
        <div className="overflow-hidden">
          <div className="w-full grid justify-center gap-1 items-center text-start p-6  ">
            <h1 className="text-2xl font-semibold   ">Any Plans For Today</h1>
          </div>

          <div className="flex justify-center mx-5 ">
            <input type='text' value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='make a list....' className="w-[60vw] ss:w-[50vw] sm:w-[30vw] md:w-[20vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" />
            <button onClick={addTask} className="bg-cyan-500 p-2  text-2xl font-bold"><IoSend /></button>
          </div>
        </div>
        <ul className="w-full grid justify-center items-center text-[black] text-2xl gap-3 pt-[3rem] ">
          {todo.map((list, index) =>
            <li key={index}>
              <div className="flex justify-between  gap-20 items-center p-2 rounded-sm">
                <p>{list}</p>
                <div>
                  <button onClick={() => editTask(index, prompt('Edit task:', list))}><BiSolidEdit /></button>
                  <button onClick={() => removeTask(index)}><MdDelete /></button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskModal;