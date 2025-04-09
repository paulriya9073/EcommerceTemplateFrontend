import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserAdmin, loadAllUser, loadSingleUser, updateUserRole } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { MdSave, MdCancel } from 'react-icons/md';
import logo from '/logo.png';
import DeleteModal from '../Layouts/DeleteModal';

export default function AllUser() {
    const { users, user, singleUser } = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const [visibleAllUsers, setVisibleAllUsers] = React.useState(6);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState(null);
    
    // Update user role modal state
    const [showUpdateModal, setShowUpdateModal] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(loadAllUser());
    }, [dispatch]);

    React.useEffect(() => {
        if (userId) {
            dispatch(loadSingleUser(userId));
        }
    }, [dispatch, userId]);

    React.useEffect(() => {
        if (singleUser) {
            setUsername(singleUser.username || '');
            setEmail(singleUser.email || '');
            setRole(singleUser.role || '');
        }
    }, [singleUser]);

    const editHandler = (id) => {
        setUserId(id);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setUserId(null);
    };

    const submitRoleUpdateHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserRole(userId, role));
        toast.success("Role Updated!");
        closeUpdateModal();
        dispatch(loadAllUser());
    };

    const deleteUserHandler = () => {
        if (!userToDelete) return;
        dispatch(DeleteUserAdmin(userToDelete));
        dispatch(loadAllUser());
        toast.success("User Deleted!");
        setUserToDelete(null);
        closeDeleteModal();
    };

    const loadMoreUsers = () => {
        setVisibleAllUsers((prev) => prev + 4);
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };
    
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            {/* all users */}
            <div className='h-full lg:mx-8 pb-8'>
                <div className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
                    <div className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl font-medium'>
                        <div>Username</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Action</div>
                    </div>
                    {users && Object.values(users).slice(0, visibleAllUsers).map((u) => (
                        <div key={u._id} className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl px-4 border-t border-gray-300'>
                            <div className=''>{u.username}</div>
                            <div>{u.email}</div>
                            <div className={`px-2 font-medium rounded-md h-10 flex justify-center items-center ${u.role === 'admin' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>{u.role}</div>
                            <div className='flex gap-2 flex-row items-center'>
                                <button className='p-2 bg-blue-100 rounded-md' onClick={() => editHandler(u._id)}>
                                    <i className="ri-pencil-line text-blue-600 text-xl md:text-2xl"></i>
                                </button>
                                <button
                                    className={`p-2 bg-red-100 rounded-md ${user?._id === u._id ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => {
                                        setUserToDelete(u._id);
                                        openDeleteModal();
                                    }}
                                    disabled={user?._id === u._id}
                                > 
                                    <i className="ri-delete-bin-line text-red-600 text-xl md:text-2xl"></i>
                                </button>
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

            {/* DeleteModal component */}
            {showDeleteModal && (
                <DeleteModal 
                    heading={'Delete User'}
                    title1="Are you sure you want to delete this user's account?" 
                    title2="This action cannot be undone and all data of this user will be permanently deleted." 
                    onClose={closeDeleteModal}
                    deleteHandler={deleteUserHandler}
                    buttonName={"Delete User"}
                />
            )}

            {/* Update User Role Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white shadow-xl border-2 rounded-lg p-6 w-80 md:w-96 space-y-6">
                        {/* Logo */}
                        <div className="flex justify-center mb-2">
                            <img className="w-36 h-20 md:w-48 md:h-28" src={logo} alt="Logo" />
                        </div>
                        
                        <div className="flex justify-center text-lg font-bold">
                            <h1>Update User Role</h1>
                        </div>
                        
                        <form onSubmit={submitRoleUpdateHandler} className="flex flex-col gap-4">
                            <div className="flex items-center border rounded-md p-3">
                                <FaUser className="text-blue-600 mr-3" size={24} />
                                <input
                                    className="flex-1 focus:outline-none"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    readOnly
                                />
                            </div>
                            
                            <div className="flex items-center border rounded-md p-3">
                                <FaEnvelope className="text-blue-600 mr-3" size={24} />
                                <input
                                    className="flex-1 focus:outline-none"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    readOnly
                                />
                            </div>
                            
                            <div className="flex items-center border rounded-md p-3">
                                <FaUserShield className="text-blue-600 mr-3" size={24} />
                                <input
                                    className="flex-1 focus:outline-none"
                                    type="text"
                                    placeholder="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex justify-between gap-2">
                                <button
                                    className="w-1/2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                                    type="button"
                                    onClick={closeUpdateModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="w-1/2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}