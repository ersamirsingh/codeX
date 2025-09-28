import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import axiosClient from "../API/axiosClient";

function UpdateProblemList() {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {

    const fetchProblems = async () => {

      try {

        setLoading(true)
        setError('')

        const res = await axiosClient.get("/problem/getAllProblem");

        if(!res.data || res.data.length === 0) throw new Error('Problem not found')

        setProblems(res.data);
        // console.log(res.data)
          // console.log(problems)
      } catch (err) {
          // console.error("Error fetching problems:", err);
        setError(err)
        setProblems([])
      }
      
      finally{
          setLoading(false)
      }
    };
    
    fetchProblems();

  }, []);

  // if(setLoading) return div
      if (loading) {
          return (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          );
      }

    if(error){
      return (
        alert("Error:", error)
      );
    }


    return (

    <div className="max-w-95% w-90% mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">All Problems</h1>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <div className="overflow-x-auto w-90%">
          {
            problems.map(problem=>(

              <div key={problem._id} className="card bg-base-100 shadow-xl relative">
                <div className="card-body">

                  <div className="flex items-center justify-between">
                    <h2 className="card-title">
                      {problem.title}
                    </h2>
                    {/* <p>{problem._id}</p> */}
                  </div>
                                              
                  <div className="flex gap-2">
                                                  
                    <div className="badge badge-info">
                      {problem.tags}
                    </div>
                  </div>

                </div>

                <NavLink 
                  to={`/admin/problem/update/${problem._id}`}
                  className='absolute btn right-3 bg-red-500'
                >
                  update
                </NavLink>

              </div>

              

            ))
          }
        </div>
      )}
    </div>
  );
}


export default UpdateProblemList;
