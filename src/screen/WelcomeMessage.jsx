import React from 'react'

const WelcomeMessage = () => {
    return (
        <div className="WelcomeMessage flex flex-col items-start ml-8 bottom-0 transform translate-y-[10vh] ss:translate-y-[15vh]">
            <div className="Auxibot text-start text-violet-900 text-xl font-bold font-['Inter'] mb-2">AuxiBot</div>
            <div className="WelcomeBelieve text-start text-gray-900 text-opacity-75 text-xl font-normal font-['Inter']">Welcome  Believe</div>
            <div className="Group20 flex flex-wrap gap-5">
                <div className="Group17 cursor-pointer">
                    <div className="SetReminder w-[200px] [50px] text-center text-black text-xl font-normal font-['Inter'] bg-violet-900 bg-opacity-30 rounded-[20px] flex items-center justify-center m-auto cursor-pointe p-2 cursor-pointer">Set Reminder</div>
                </div>
                <div className="Group18">
                    <div className="MakeAList w-[200px] [50px] text-center text-black text-xl font-normal font-['Inter'] bg-violet-900 bg-opacity-30 rounded-[20px] flex items-center justify-center m-auto cursor-pointer p-2">Make a list</div>
                </div>
            </div>

        </div>
    )
}

export default WelcomeMessage