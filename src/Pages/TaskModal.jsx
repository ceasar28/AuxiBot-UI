import { useState } from "react";
import {BiSolidEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { IoSend } from "react-icons/io5"



const TaskModal = () => {
    const [todo, setTodo] = useState([]);
    const [value, setValue] = useState('');

    const addTask = () => {
    };
  
    const removeTask = (index) => {
      const updatedTask = todo.filter((_, i) => i !== index);
      setTodo(updatedTask)
    }
  
    const editTask = (index, newTask) => {
    };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center">
        <div className='flex gap-2'>
          <div className='bg-white w-[40rem] p-8'>
            <h1>Todo List</h1>
            <ul className="w-full grid justify-center items-center text-[white] text-2xl gap-3 pt-[3rem] ">
               {todo.map((list, index) => 
               <li key={index}>
                 <div className="flex justify-between  gap-10 items-center bg-cyan-500 p-2 rounded-sm">
                 <p>{list}</p>
                <div>r
                </div>
                <div>
                <button onClick={() => editTask(index,prompt('Edit task:', list))}><BiSolidEdit/></button>
                <button onClick={() => removeTask(index)}><MdDelete/></button>
                </div>
                 </div>
               </li>
               )}
             </ul>
              <div className="flex justify-center mt-[2rem]">
                <input type='text' value={value} onChange={(e) =>setValue(e.target.value)}  placeholder='Add Task....' className="border-slate-200 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
                <button onClick={addTask} className="bg-cyan-500 p-2  text-2xl font-bold"><IoSend /></button>
              </div>

              
          </div>
          <p className='bg-[white] p-2 h-9'>X</p>
        </div>
    </div>
  )
}

export default TaskModal
