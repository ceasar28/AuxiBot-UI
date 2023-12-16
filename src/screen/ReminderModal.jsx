import { useState } from "react";
import { link } from '../data';
import { Link } from "react-router-dom";
import { FiX } from 'react-icons/fi';

const ReminderModal = () => {
  const [title, setTitle] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mails, setMails] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      meetLink,
      date,
      time,
      mails
    };

    console.log("Form submitted:", formData);

    setTitle('');
    setMeetLink('');
    setDate('');
    setTime('');
    setMails([]);
  };


  const handleMailsChange = (e) => {
    const mails = e.target.value.split(',').map(mails => mails.trim());
    setMails(mails);
  };



  return (
    <div className="w-full h-[100vh]  items-center  bg-gray-800 bg-opacity-50  flex justify-center">

      <div className="w-[90vw] sm:w-[50vw] h-[32rem] flex p-8 bg-white justify-center items-center rounded-lg shadow-8xl m-auto transform transition-all duration-300 hover:shadow-4xl">
        <form onSubmit={handleSubmit} className=" flex flex-col w-full">
          <Link to="/auxibot">
            <div className="p-2 mb-2 cursor-pointer " >
              <FiX className="text-black  text-lg absolute top-5 left-5" />
            </div>
          </Link>
          <div className='flex justify-between'>
            <h1 className="font-bold text-2xl text-[#300193]">Set Reminder</h1>
            <button type="submit" className="bg-[#300193] px-4 py-1 text-white text-md rounded-full">Save</button>
          </div>

          <div className='mt-[1rem] grid items-center justify-center gap-4'>
            <div className='grid gap-1'>
              <label>Add Title</label>
              <div>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Add Title'
                  className="w-[60vw] ss:w-[50vw] sm:w-[30vw] md:w-[20vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>

            <div className='grid gap-1'>
              <label>Add invite</label>
              <div>
                <div className='absolute  mt-12  flex justify-center items-center gap-2'>
                </div>
                <input
                  type="text"
                  value={mails.join(',')}
                  onChange={handleMailsChange}
                  placeholder='Invitee Email (comma-separated)'
                  className="w-[60vw] ss:w-[50vw] sm:w-[30vw] md:w-[20vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>

            <div className='grid gap-1'>
              <label>Add Meeting Information</label>
              <div>
                <input
                  type='text'
                  required
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  placeholder='Meeting Information'
                  className="w-[60vw] ss:w-[50vw] sm:w-[30vw] md:w-[20vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>

            <div className='grid gap-1 '>
              <label>Time/Date </label>
              <div className='flex justify-between w-[60vw] ss:w-[50vw] sm:w-[30vw] md:w-[20vw]'>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder='Add Date'
                  className="w-[48%] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
                <input
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder='Add Time'
                  className="w-[48%] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReminderModal;
