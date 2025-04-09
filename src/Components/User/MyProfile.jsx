import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { DeleteUserAccount, updateProfile } from '../../Actions/User';
import DeleteModal from '../Layouts/DeleteModal';

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Group related states together for clarity
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: ''
    });

    const [editing, setEditing] = useState({
        username: false,
        email: false,
        phone: false,
        gender: false
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Initialize form data from user data when available
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                gender: user.gender || ''
            });
        }
    }, [user]);

    // Handle input changes with a single function
    const handleInputChange = (field, value) => {
        // Special validation for phone numbers
        if (field === 'phone') {
            if (!/^\d*$/.test(value) || value.length > 10) {
                return;
            }
        }
        
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Toggle edit mode for a specific field
    const toggleEditMode = (field) => {
        setEditing(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
        
        // Reset field value if canceling
        if (editing[field]) {
            setFormData(prev => ({
                ...prev,
                [field]: user[field] || ''
            }));
        }
    };

    // Save changes for the current editing field
    const handleUpdateProfile = (field) => {
        dispatch(updateProfile(
            formData.username,
            formData.email,
            formData.phone,
            formData.gender
        ));
        
        toast.success("Profile Updated!");
        
        // Exit edit mode
        setEditing(prev => ({
            ...prev,
            [field]: false
        }));
    };

    // Handle account deletion
    const deleteHandler = () => {
        if (user?._id) {
            dispatch(DeleteUserAccount(user._id));
            toast.success('Account Deleted!');
            navigate('/');
        } else {
            toast.error('User not found');
        }
    };

    // Reusable field component to reduce repetition
    const ProfileField = ({ label, field, type = 'text', children }) => {
        const isEditing = editing[field];
        
        return (
            <div className="flex flex-col gap-2 md:gap-4 w-full md:h-28 px-3">
                <label className="md:text-3xl">{label}</label>
                <div className="flex flex-row items-center gap-4 w-full">
                    {children || (
                        <input
                            className="md:text-2xl border-blue-400 border rounded-lg bg-blue-50 w-full p-2"
                            type={type}
                            value={formData[field]}
                            readOnly={!isEditing}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                        />
                    )}
                    
                    {isEditing ? (
                        <div className="flex">
                            <button
                                className="w-9 h-5 md:w-12 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500 mr-3"
                                onClick={() => handleUpdateProfile(field)}
                            >
                                Save
                            </button>
                            <button
                                className="w-12 h-5 md:w-16 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-red-500"
                                onClick={() => toggleEditMode(field)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="w-8 h-5 md:w-10 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500"
                            onClick={() => toggleEditMode(field)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="h-full mb-8 w-full flex flex-col justify-center items-center">
                <div className="flex flex-col bg-white shadow-md pb-8 justify-center items-center rounded-md mb-4 p-2 gap-4 md:p-8 md:gap-8 max-w-4xl w-full mx-auto">
                    {/* Username Field */}
                    <ProfileField label="User Name" field="username" />
                    
                    {/* Email Field */}
                    <ProfileField label="Email" field="email" type="email" />
                    
                    {/* Phone Field */}
                    <ProfileField label="Phone" field="phone" />
                    
                    {/* Gender Field - Custom implementation due to radio buttons */}
                    <ProfileField label="Gender" field="gender">
                        <div className="flex flex-row gap-4 w-full">
                            {['Male', 'Female', 'Others'].map((option) => (
                                <div key={option} className="flex gap-2">
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={formData.gender === option}
                                        disabled={!editing.gender}
                                        onChange={() => handleInputChange('gender', option)}
                                    />
                                    <label className="text-[.8rem] md:text-2xl">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </ProfileField>

                    {/* Delete Account Section */}
                    <div className="w-full mt-8 border-t border-gray-200 pt-6 flex flex-col items-center">
                        <h2 className="text-xl md:text-2xl font-semibold text-red-600 mb-4">Account Actions</h2>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md shadow-md transition duration-200 flex items-center gap-2"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            <FaTrash size={16} />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* DeleteModal component */}
            {showDeleteModal && (
                <DeleteModal
                    heading={'Delete Account'}
                    title1="Are you sure you want to delete your account?"
                    title2="This action cannot be undone and all your data will be permanently deleted."
                    onClose={() => setShowDeleteModal(false)}
                    deleteHandler={deleteHandler}
                    buttonName={"Delete Account"}
                />
            )}
        </>
    );
};

export default MyProfile;