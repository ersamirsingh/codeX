import React, { useState, useEffect } from "react";
import axiosClient from "../API/axiosClient";
import { useNavigate } from "react-router";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaTrophy,
  FaFire,
  FaEdit,
  FaTools,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Nav from "../Utils/Nav";

export default function Profile() {
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(false);
   const [showProblems, setShowProblems] = useState(false);
   const navigate = useNavigate();
   const [problems, setProblems] = useState([]);

   const fetchProfile = async () => {
      try {
         setLoading(true);
         const response = await axiosClient.get("/user/profile");
         setUser(response.data.user);
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchProfile();
   }, []);




   const problemSolved = async ()=>{

      try {
         setLoading(true)
         const response = await axiosClient.get("/problem/problemSolvedByUser");
         console.log(response.data)
         setProblems(response.data)
      } catch (error) {
         setLoading(true)
         console.log(error)
      }
      finally{
         setLoading(false)
      }
   }

   useEffect(()=>{
      problemSolved()
   }, [])



   const handleEdit = () => navigate("/profile/edit");

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-base-100 shadow-lg">
         <span className="loading loading-spinner loading-lg text-white"></span>
         </div>
      );
   }

   return (
      <div className="min-h-screen w-screen bg-linear-to-br from-indigo-200 via-purple-700 to-pink-300">
         <Nav/>
         <div className="bg-transparent shadow-2xl w-screen max-w-screen h-screen p-10 flex flex-col overflow-y-auto">
         {/* Profile Header */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6">
            <div className="flex items-center gap-5">
               <FaUserCircle className="text-7xl text-indigo-600" />
               <div>
               <h2 className="text-3xl font-bold text-gray-800">
                  {user?.firstName || "User"} {user?.lastName || ""}
               </h2>
               <p className="text-gray-600 text-sm">{user?.emailId}</p>
               <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                     user?.role === "admin"
                     ? "bg-red-100 text-red-700"
                     : "bg-blue-100 text-blue-700"
                  }`}
               >
                  {user?.role?.toUpperCase()}
               </span>
               </div>
            </div>
         </div>

         {/* Stats Section */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
               <FaTrophy className="mx-auto text-3xl text-yellow-500 mb-2" />
               <p className="font-semibold text-gray-700">Problems Solved</p>
               <p className="text-3xl font-bold text-gray-900">
               {user?.problemsSolved || 0}
               </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
               <FaFire className="mx-auto text-3xl text-orange-500 mb-2" />
               <p className="font-semibold text-gray-700">Current Streak</p>
               <p className="text-3xl font-bold text-gray-900">
               {user?.currentStreak || 0} 🔥
               </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
               <FaCalendarAlt className="mx-auto text-3xl text-green-500 mb-2" />
               <p className="font-semibold text-gray-700">Longest Streak</p>
               <p className="text-3xl font-bold text-gray-900">
               {user?.longestStreak || 0} 🏆
               </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
               <FaCalendarAlt className="mx-auto text-3xl text-purple-500 mb-2" />
               <p className="font-semibold text-gray-700">Joined On</p>
               <p className="text-lg font-bold text-gray-900">
               {new Date(user?.createdAt || Date.now()).toDateString()}
               </p>
            </div>
         </div>

         {/* Solved Problems Section */}
         <div className="mt-10">
            <div
               className="flex justify-between items-center cursor-pointer bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition"
               onClick={() => setShowProblems(!showProblems)}
            >
               <h3 className="text-lg font-semibold text-indigo-700">
               Solved Problems
               </h3>
               {showProblems ? (
               <FaChevronUp className="text-indigo-700" />
               ) : (
               <FaChevronDown className="text-indigo-700" />
               )}
            </div>

            {showProblems && (
               <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-3 transition-all">
               {problems && problems.length > 0 ? (
                  <ul className="space-y-2">
                     {problems.map((problem, index) => (
                        <li
                           key={index}
                           className="p-3 bg-white shadow-sm rounded-lg border hover:bg-gray-100 transition"
                        >
                           <p className="font-medium text-gray-800">
                              {index + 1}. {problem.title}
                           </p>
                           <p className="text-sm text-gray-500">
                              Difficulty:{" "}
                              <span
                              className={`font-semibold ${
                                 problem.difficulty === "easy"
                                    ? "text-green-600"
                                    : problem.difficulty === "medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                              >
                              {problem.difficulty}
                              </span>
                           </p>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p className="text-gray-600 text-sm italic text-center">
                     No problems solved yet.
                  </p>
               )}
               </div>
            )}
         </div>

         {/* Footer Actions */}
         <div className="flex justify-end space-x-4 mt-10 border-t pt-6">
            <button
               className="btn btn-outline btn-primary flex items-center gap-2"
               onClick={handleEdit}
            >
               <FaEdit /> Edit Profile
            </button>

            {user?.role === "admin" && (
               <button
               className="btn btn-error flex items-center gap-2"
               onClick={() => navigate("/admin")}
               >
               <FaTools /> Admin Dashboard
               </button>
            )}
         </div>
         </div>
      </div>
   );
}
