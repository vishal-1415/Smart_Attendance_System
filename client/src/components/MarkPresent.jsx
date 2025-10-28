import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setAlertBox } from '../store';
import { api } from '../services/api';
import AlertComponent from './AlertComponent';

const MarkPresent = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || rollNumber === "") {
            dispatch(setAlertBox({ 
                title: "Empty Fields", 
                message: "All the Fields are required!", 
                color: "orange", 
                show: true 
            }));
            return;
        }

        try {
            // Add the student using our API
            await api.addStudent({ 
                name, 
                rollNumber,
                attendance: [{
                    date: new Date(),
                    present: true
                }]
            });
            
            setRollNumber('');
            setName('');
            
            dispatch(setAlertBox({ 
                title: "Attendance Marked", 
                message: `${name}'s Attendance is Marked`, 
                color: "teal", 
                show: true 
            }));
        } catch (error) {
            dispatch(setAlertBox({ 
                title: "Error!", 
                message: error.message || "Failed to mark attendance", 
                color: "red", 
                show: true 
            }));
            console.error(error);
        }
    };

    return (
        <>
        <AlertComponent></AlertComponent>
            <div className="flex justify-center min-h-screen items-center flex-wrap">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-2xl shadow-purple-300 rounded px-8 pt-6 pb-8 mb-4" method="POST" autoComplete="off" onSubmit={handleSubmit}>
                        <h1 className='text-2xl font-bold mb-6 text-purple-400 text-center'>Enter Present Student Details</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Student Full Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNumber">
                                Roll Number
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rollNumber" type="text" value={rollNumber} placeholder="Enter Roll Number" onChange={(e) => setRollNumber(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default MarkPresent;
