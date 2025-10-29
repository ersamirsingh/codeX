import React from "react";
import {useState, useEffect} from 'react';
import axiosClient from "../API/axiosClient";

export default function Profile() {
   

   const [user, setUser] = useState({})
   const [loading, setLoading] = useState(false)


   const fetchProfile = async () => {

      try {
         setLoading(true)
         const response = await axiosClient.get('/user/profile');
         console.log(response.data)
         setUser(response.data.user);
      } catch (error) {
         setLoading(true)
         console.error(error);
      }
      finally{
         setLoading(false)
      }

   };

   useEffect(() => {
      fetchProfile()
   }, [])


   // function Dashboard() {
   //    setUser({
   //       firstName: user.name,
   //       emailId: user.emailId,
   //       role: user.role, // or "Admin"
   //       problemsSolved: user.problemsSolved,
   //       currentStreak: user.currentStreak || 0,
   //       longestStreak: user.longestStreak || 0,
   //       createdAt: user.createdAt || 'unknown',
   //    });
   // }

   const handleEdit = () => alert("Open profile edit modal");


   if (loading) {
      return (
         <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }

   return (
      
      <div className="flex justify-center mt-10">
         <div className="card w-96 bg-base-100 shadow-xl border border-base-200">
         <div className="card-body">
            <h2 className="card-title text-2xl text-primary">
               {user?.firstName}'s Profile
            </h2>
            <div className="divider"></div>

            <div className="space-y-2 text-base-content/90">
               <p>
                  <span className="font-semibold">Email:</span> {user?.emailId}
               </p>
               <p>
                  <span className="font-semibold">Role:</span>{" "}
                  <span
                     className={`badge ${
                        user?.role === "Admin" ? "badge-error" : "badge-secondary"
                     } badge-sm`}
                  >
                     {user?.role}
                  </span>
               </p>
               <p>
               <span className="font-semibold">Problems Solved:</span>{" "}
               {user?.problemsSolved || 0}
               </p>
               <p>
                  <span className="font-semibold">Current Streak:</span>{" "}
                  <span className="text-orange-500 font-bold">
                     🔥 {user?.currentStreak || 'unavailable'} days
                  </span>
               </p>
               <p>
                  <span className="font-semibold">Longest Streak:</span>{" "}
                  <span className="text-green-600 font-bold">
                     🏆 {user?.longestStreak || 'unavailable'} days
                  </span>
               </p>
               <p>
                  <span className="font-semibold">Joined On:</span>{" "}
                  {new Date(user?.createdAt || 'not found').toDateString()}
               </p>
            </div>

            <div className="divider"></div>

            <div className="card-actions justify-end">
               {user?.role === "User" && (
                  <button
                     className="btn btn-outline btn-primary btn-sm"
                     onClick={handleEdit}
                  >
                     Edit Profile
                  </button>
               )}

               {user?.role === "Admin" && (
                  <button
                     className="btn btn-error btn-sm"
                     onClick={() => alert("Opening Admin Dashboard...")}
                  >
                     Manage Dashboard
                  </button>
               )}
            </div>
         </div>
         </div>
      </div>
   );
}
