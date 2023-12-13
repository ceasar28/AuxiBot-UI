import add from '../assets/Group (1).png';
import RecentChat from './RecentChat';
import { FiChevronRight } from 'react-icons/fi';

const RightSidebar = ({ rightSidebarOpen, toggleRightSidebar, showRecentChat }) => {
    return (
        <div>
            {rightSidebarOpen && (
                <div className="RightSideBar w-[17rem] min-h-[100vh] bg-violet-900 flex flex-col justify-between items-center text-center transition-all duration-300 m-0 absolute right-0 top-0">
                    {/* Close button */}
                    <div className="p-2 mb-2 cursor-pointer absolute" onClick={toggleRightSidebar}>
                        <FiChevronRight className="text-white absolute text-lg top-[1.3rem] right-[7rem]" />
                    </div>
                    {/* Content for the right sidebar */}
                    <div className="flex flex-col items-start justify-between mt-[3rem]">
                        <div className="w-[14rem] flex items-center justify-between">
                            <div className="text-neutral-400 text-opacity-90 text-base font-medium font-['Inter']">Daily Task</div>
                            <img
                                src={add}
                                alt="Logo"
                                className="w-3.5 h-3.5 cursor-pointer"
                            />
                        </div>
                        <RecentChat />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightSidebar;
