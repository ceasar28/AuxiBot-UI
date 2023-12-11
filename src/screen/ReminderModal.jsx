import { useState } from "react";
import {link} from '../data'



const ReminderModal = () => {

  const [value, setValue] = useState([]);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle();
    setEmail();
    setValue();

  }

  

  return (
     
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center ">
    <div className=" md:w-[40rem] p-8  bg-white justify-center items-center  mx-20">
    <form onSubmit={handleSubmit} className="mt-6 grid justify-center items-center overflow-hidden">
        <div className='flex justify-between'>
            <h1 className="font-bold text-2xl text-[#300193]">Set Reminder</h1>
            <button type="submit"  className="bg-[#300193] px-4 py-1 text-white text-md rounded-full">Save</button>
        </div>

        <div className='mt-[3rem] grid justify-center gap-4'>

        <div className='grid gap-1'>
            <label>Add Title</label>
            <div>
             <input type='text' value={title} 
             onChange={(e) => setTitle(e.target.value)} 
             placeholder='Add Title' className="w-[20rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
            </div>
        </div>
        <div className='grid gap-1'>
            <label>Email</label>
            <div>
             <input type='email'required value={email} 
             onChange={(e) => setEmail(e.target.value)} 
             placeholder='Add Email' className="w-[20rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
            </div>
        </div>
        

        <div className='grid gap-1'>
            <label>Add invite</label>
            <div>
             <input type='email'  multiple required value={value} 
             onChange={(e) => setValue(e.target.value)} 
             placeholder='Invitee Email' className="w-[20rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
             
            </div>
        </div>

        <div className='grid gap-1'>
            <label>Add Location</label>
            <select  className="w-[20rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500">
            {link.map((item, index) => (
                <option key={index}>{item.icon}{item.name}</option>
            ))}
            </select>
        </div>

        <div className='grid gap-1'>
            <label>Time/Date </label>
            <div className='flex gap-1'>
             <input type='date'  
             placeholder='Add Date' className="w-[10rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/> 
             <input type='time' 
             placeholder='Add Time' className="w-[10rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
            </div>
        </div>
       
        <div className='grid gap-1'>
            <label>Add Notification</label>
            <select  className="w-[20rem] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500">
            <option > Yes </option>
            <option  > No</option>
            </select>
        </div>

        </div>
       </form>
    </div>
    </div>

  )
}

export default ReminderModal
