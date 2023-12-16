import { useState } from "react";
import { link } from '../data';
import { Link } from "react-router-dom";
import { FiX } from 'react-icons/fi';

const ReminderModal = () => {
  const [title, setTitle] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather all form data
    const formData = {
      title,
      meetLink,
      emails,
      date,
      time
    };

    // Log form data
    console.log("Form submitted:", formData);

    // Reset the form fields
    setTitle('');
    setMeetLink('');
    setEmails([]);
    setCurrentEmail('');
    setDate('');
    setTime('');
  };

  const handleInputChange = (e) => {
    setCurrentEmail(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && currentEmail.trim() !== '') {
      const enteredEmails = currentEmail.split(',').map(email => email.trim());
      enteredEmails.forEach(email => {
        setEmails(prevEmails => [...prevEmails, email]);
        console.log('Added email:', email); // Log the added email
      });
      setCurrentEmail('');
    }
  };






  const handleRemoveEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  return (
    <div className="w-full h-[100vh]  items-center  bg-gray-800 bg-opacity-50  flex justify-center">

      <div className="w-[90vw] sm:w-[50vw] h-[32rem] flex p-8 bg-white justify-center items-center rounded-lg shadow-8xl max-w-md m-auto transform transition-all duration-300 hover:shadow-4xl">
        <form onSubmit={handleSubmit} className=" flex flex-col w-[80vw] sm:w-[40vw]">
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
                  className="w-[80vw] sm:w-[40vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>

            <div className='grid gap-1'>
              <label>Add invite</label>
              <div>
                <div className='absolute  mt-12  flex justify-center items-center gap-2'>
                  {emails.map((email, index) => (
                    <div key={index} className="bg-[#300193] px-2 py-1 text-xs rounded-full text-white">
                      {email}
                      <button onClick={() => handleRemoveEmail(index)} className='absolute pl-2 text-[black] mb-8'>&times;</button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentEmail}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder='Invitee Email'
                  className="w-[80vw] sm:w-[40vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
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
                  className="w-[80vw] sm:w-[40vw] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
              </div>
            </div>

            <div className='grid gap-1'>
              <label>Time/Date </label>
              <div className='flex gap-1'>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder='Add Date'
                  className="w-[1/2] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                />
                <input
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder='Add Time'
                  className="w-[1/2] p-3 bg-slate-300 border-slate-500 placeholder-slate-400 px-3 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
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
