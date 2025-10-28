import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertBox, setStudents } from '../store';
import { api } from '../services/api';
import AlertComponent from "./AlertComponent";

const PresentStudent = () => {

    const { students } = useSelector((state) => state.students);
    const dispatch = useDispatch()

    const getStudent = async () => {
        try {
            const students = await api.getAllStudents();
            dispatch(setStudents(students));
        } catch (error) {
            console.error(error);
            dispatch(setAlertBox({ 
                title: "Error!", 
                message: "Failed to fetch students", 
                color: "red", 
                show: true 
            }));
        }
    }

    useEffect(() => {
        getStudent();
    }, []);

    const handleCheckout = async (id, name) => {
        try {
            await api.markAttendance(id, false);
            dispatch(setAlertBox({ 
                title: "Successfully Checked-Out", 
                message: `${name} checked-out`, 
                color: "teal", 
                show: true 
            }));
            await getStudent(); // Refresh the list
        } catch (error) {
            dispatch(setAlertBox({ 
                title: "Error!", 
                message: error.message || "Failed to checkout", 
                color: "red", 
                show: true 
            }));
            console.error(error);
        }

    }

    return (
        <>
        <AlertComponent></AlertComponent>
            <div className='w-full pt-20 mb-10'>

                <h1 className='text-2xl font-bold mb-6 text-purple-400 text-center'>Present Student In Class</h1>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-purple-100">
                            <th className="border px-4 py-2">Sr. No.</th>
                            <th className="border px-4 py-2">Roll Number</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Check-in Time</th>
                            <th className="border px-4 py-2">Check-out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id || index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{student.rollNumber}</td>
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">
                                    <button className="m-1 bg-transparent hover:bg-green-400 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded">
                                        {new Date(student.attendance[student.attendance.length - 1]?.date).toLocaleTimeString()}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">
                                    {!student.attendance[student.attendance.length - 1]?.present ? (
                                        <button className="m-1 bg-red-400 font-semibold text-white py-2 px-6 border border-red-400 hover:border-transparent rounded">
                                            Checked Out
                                        </button>
                                    ) : (
                                        <button className="m-1 bg-transparent hover:bg-red-400 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded"
                                            onClick={() => handleCheckout(student._id, student.name)}
                                        >
                                            Leave School
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PresentStudent;
