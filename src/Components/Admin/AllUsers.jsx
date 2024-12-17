import * as React from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserAccount, DeleteUserAdmin, loadAllUser } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

export default function AllUser() {


    const { users, user } = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const [visibleAllUsers, setVisibleAllUsers] = React.useState(6)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(loadAllUser())
    }, [dispatch])

    const editHandler = (id) => {
        navigate(`/admin/update/userrole/${id}`)
    }

    // console.log(users);

    //  console.log(user.role);

    const deleteUserHandler = (id) => {
       
        dispatch(DeleteUserAdmin(id))
        dispatch(loadAllUser())
        toast.success("User Deleted!")
    }

    const loadMoreUsers = () => {
        setVisibleAllUsers((prev) => prev + 4)
    }


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar disableSearch={true} />
            <div className='w-full h-auto grid grid-cols-12  bg-blue-50 '>
            <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-2`}
        >
          <div className="relative">
            <AdminSidebar />
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
            <FaArrowLeft/>
            </button>
          </div>
        </aside>
                <div className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-3xl flex justify-center items-center">
                        <h1 className="px-4 font-bold">Users</h1>
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div className='mx-8 pb-8'>
                        <div className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
                            <div className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl font-medium'>

                                <div>Username</div>
                                <div>Email</div>
                                <div>Role</div>
                                <div>Action</div>
                            </div>
                            {users && Object.values(users).slice(0, visibleAllUsers).map((u) => (
                                <div key={u._id} className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl px-4 border-t  border-gray-300'>
                                    <div className=''>{u.username}</div>
                                    <div>{u.email}</div>
                                    <div className={`px-2 font-medium rounded-md h-10 flex justify-center items-center ${u.role === 'admin' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>{u.role}</div>
                                    <div className='flex gap-2 flex-row items-center'>
                                        <button className='p-2 bg-blue-100 rounded-md' onClick={() => editHandler(u._id)}><i className="ri-pencil-line text-blue-600 text-xl md:text-2xl"></i></button>
                                        <button
                                            className={`p-2 bg-red-100 rounded-md ${user?._id === u._id ? 'cursor-not-allowed opacity-50' : ''}`}
                                            onClick={() => deleteUserHandler(u._id)}
                                            disabled={user?._id === u._id}
                                        > <i className="ri-delete-bin-line text-red-600 text-xl md:text-2xl"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-5 flex justify-center items-center'>
                            {users?.length > visibleAllUsers && (
                                <button onClick={loadMoreUsers} className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'>Load More</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
