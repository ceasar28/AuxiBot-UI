import React from 'react'

const Home = () => {
    return (
        <div className="min-h-[100vh]  flex">
            <div className="w-[25vw] min-h-[100vh]  bg-violet-900 flex flex-col justify-center items-center">
                <div className="text-white text-lg font-medium font-['Inter']">New Chat</div>
                <div className="text-neutral-400 text-opacity-90 text-base font-medium font-['Inter']">Recent</div>
                <div className="text-neutral-400 text-opacity-90 text-lg font-medium font-['Inter']">Upcoming Event</div>
                <div className=" ">
                    <div className=" text-white text-lg font-medium font-['Inter']">Believe</div>
                </div>
                <div className=" ">
                    <div className=" text-white text-lg font-medium font-['Inter']">Logout</div>
                </div>
            </div>


            <div className="w-[25vw] min-h-[100vh]">
                <div className="  text-violet-900 text-xl font-bold font-['Inter']">AuxiBot</div>
                <div className=" text-gray-900 text-opacity-75 text-xl font-normal font-['Inter']">Welcome  Believe</div>
                <div className="w-[25vw] h-[50px]]">
                    <div className="w-[15vw] h-[50px] ">
                       
                        <div className=" text-black text-xl font-normal font-['Inter']">Set Reminder</div>
                    </div>
                    <div className="w-[15vw] h-[50px]">
                       
                        <div className="w-[20vw]  text-black text-xl font-normal font-['Inter']">Make a list</div>
                    </div>
                </div>
                <div className="w-[25vw] h-20 ">
                    <div className="w-[25vw] h-20  rounded-xl border border-black" />
                    <div className="w-[25vw] h-[50px]">
                        
                        <div className="w-[10vw] h-[50px]">
                            <div className="w-[10vw] h-[50px]  bg-violet-900 rounded-[29px]" />
                            <div className="w-[10vw] h-[28.57px] origin-top-left rotate-[-33.30deg]" />
                        </div>
                        <div className=" text-neutral-900 text-opacity-40 text-[22px] font-light font-['Inter']">Start a convrsation</div>
                    </div>
                </div>
            </div>


           {/*  <div className="w-[20vw] min-h-[100vh] right-0 top-0 absolute bg-violet-900">
                <div className="text-neutral-400 text-opacity-90 text-lg font-medium font-['Inter']">Daily Task</div>
            </div> */}
        </div>
    )
}

export default Home
