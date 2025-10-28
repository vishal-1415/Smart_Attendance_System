import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center min-h-screen items-center flex-wrap">
        <div className="max-w-sm rounded overflow-hidden shadow-2xl shadow-purple-300">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">Student Attendance System</div>
            <p className="text-gray-800 text-base text-center">
              Welcome to the Student Attendance System. This application allows you to efficiently manage and track student attendance 
            </p>
          </div>
          <div className="flex gap-1 justify-center pb-4">
            <button className="m-1 bg-transparent hover:bg-purple-400 text-purple-600 font-semibold hover:text-white py-2 px-4 border border-purple-400 hover:border-transparent rounded" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home