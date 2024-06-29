import React from 'react'

import { IoIosLogOut, IoMdClose } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { IoDocumentOutline, IoHome, IoPeopleOutline, IoPersonAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../feature/User/UserSlice'


type Props = {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ setSidebarOpen }: Props) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user)
    const logOutFunc = async () => {
        dispatch(logout())
    }



    return (
        <div className="flex flex-col max-w-sm h-screen border-e border-opacity-10 shadow-lg  border-gray-500 bg-white">
            {/* Top */}

            <div className="flex justify-between px-2 py-2 gap-6 items-center">

                <h3 className='text-gray-700  text-xl font-bold  '>Simple <span className='text-primary'> Stocks</span></h3>

                <div onClick={() => setSidebarOpen(false)} className='cursor-pointer  md:hidden text-xl pe-2'>
                    <IoMdClose className='text-gray-400' />
                </div>
            </div>

            {/* Middle */}
            <div className="flex-1 overflow-y-auto flex flex-col ">

                <div className="basis-1/2  border-t pt-2 border-gray-500 px-3 border-opacity-10 ">
                    <h4 className='text-sm text-gray-600  font-medium' >Options</h4>

                    <NavLink onClick={() => setSidebarOpen(false)} to='/' className={({ isActive }) =>
                        isActive ? "text-[#9066F6]" : "text-gray-500"}>
                        <div className='  flex justify-start gap-2  text-base items-center   font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoHome />
                            </div>
                            <span>Home</span>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to='/create-user' className={({ isActive }) =>
                        isActive ? "text-[#9066F6]" : "text-gray-500"}>

                        <div className=' flex justify-start gap-2  text-base items-center  font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoPersonAddOutline />
                            </div>
                            <span>Create User</span>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to='/show-companies' className={({ isActive }) =>
                        isActive ? "text-[#9066F6]" : "text-gray-500"}>
                        <div className=' flex justify-start gap-2  text-base items-center  font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoPeopleOutline />
                            </div>
                            <span>Companies</span>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to='/docs' className={({ isActive }) =>
                        isActive ? "text-[#9066F6]" : "text-gray-500"}>
                        <div className=' flex justify-start gap-2  text-base items-center  font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoDocumentOutline />
                            </div>
                            <span>Documents</span>
                        </div>
                    </NavLink>
                </div>
            </div>
            {/* Bottom */}
            <div className="px-2 py-3 text-gray-700">
                <div className="flex w-full gap-3 justify-between items-center text-gray-00  bg-white bg-opacity-10 px-2 py-2 rounded-lg border-t border-gray-500 border-opacity-50">

                    {user && user?.photoURl !== '' ?
                        <div
                            style={{ backgroundImage: `url(${user?.photoURL})` }}
                            className="w-14 h-14 bg-cover bg-center rounded-full "
                        >

                            {/* <img src={user?.photoURL} className="w-full h-full" alt="" /> */}
                        </div>
                        : null
                    }
                    <div className='basis-[60%]'>
                        <h3 className='text-xl font-medium'>
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <h4 className='text-sm text-gray-500 -500'>
                            {user?.email}
                        </h4>
                    </div>
                    <button className="text-white basis-[20%]" title='Log Out'
                        onClick={logOutFunc}
                    >
                        <IoIosLogOut className="w-8 h-8 text-red-500" />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default SideBar