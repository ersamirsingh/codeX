import React, { useEffect, useState } from "react";
import { FaClock, FaStar, FaUsers, FaHourglassHalf } from "react-icons/fa";
import axiosClient from "../API/axiosClient";

export default function ContestList() {


  const [contests, setContests] = useState([]);
  const [errors, setErrors] = useState('')
  // const [hasFetched, setHasFetched] = useRef(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const fetchContests = async () => {

      try {
        setErrors('')
        setLoading(true)
        const { data } = await axiosClient.get("/contest");
        console.log(data)
        setContests(data);
        
        // setHasFetched(true)
        
      } catch (error) {
        setErrors(error)
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
      finally{
        setLoading(false)
      }
    };

    fetchContests();

  }, []);



  if(loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  if(errors){
    return (
      alert("Error:", errors)
    );
  }


  const formatDuration = (minutes) => {

    if (!minutes) return "-";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  };

  // const getStatus = (startTime, endTime) => {

  //   const now = new Date();
  //   if (now < new Date(startTime))
  //     return `Starts in ${Math.ceil(
  //       (new Date(startTime) - now) / (1000 * 60 * 60)
  //     )}h`;
  //   if (now >= new Date(startTime) && now <= new Date(endTime)) return "Live";
  //   return "Ended";

  // };


  const getStatus = (startTime, endTime) => {

    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      const diffMs = start - now;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;

      if (hours > 0) return `Starts in ${hours}h ${mins}m`;
      return `Starts in ${mins}m`;
    }

    if (now >= start && now <= end) return "Live";

    return "Ended";
  };



  return (

    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-8">Coding Contests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.length > 0 ? (
            
            contests.map((contest) => (

              <div
                key={contest._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h3 className="card-title text-xl">{contest.title}</h3>
                    <FaStar className="text-yellow-500" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-info" />
                    <span>
                      {`Starts in ${formatDuration(
                        Math.max(
                          0,
                          Math.floor(
                            (new Date(contest.startTime) - new Date()) / (1000 * 60) // convert ms → minutes
                          )
                        )
                      )}`}
                    </span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-sm">
                    <span>{}</span>
                    <span>Participants: {contest.participants.length || 0}</span>
                  </div>
                </div>

                <div className="card-actions justify-center pt-5 pb-5 flex">
                  <button
                    className={`btn btn-sm ${
                      getStatus(contest.startTime, contest.endTime) === "Live"
                        ? "bg-green-500"
                        : "btn-primary"
                    }`}
                  >
                    {getStatus(contest.startTime, contest.endTime) === "Live"
                      ? "Join Now"
                      : "Register Now"}
                  </button>
                  
                </div>

              </div>

            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No contests available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
