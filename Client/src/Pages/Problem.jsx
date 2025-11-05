import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; // Fixed import
import { useSelector } from 'react-redux';
import axiosClient from '../API/axiosClient';
import Nav from '../Utils/Nav';


function Problems() {
    

    const { user } = useSelector((state) => state.auth);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });

    useEffect(() => {

        const fetchProblems = async () => {

            try {
                setLoading(true)
                const { data } = await axiosClient.get('/problem/getAllProblem');
                setProblems(data);
            }
            catch (error) {
                setLoading(true)
                console.error('Error fetching problems:', error);
            }
            finally{
                setLoading(false)
            }

        };

        const fetchSolvedProblems = async () => {
            try {
                setLoading(true)
                const { data } = await axiosClient.get('/problem/problemSolvedByUser');
                // console.log(data);
                setSolvedProblems(data);
            } 
            catch (error) {
                setLoading(true)
                console.error('Error fetching solved problems:', error);
            }
            finally{
                setLoading(false)
            }
        };

        fetchProblems();
        if (user) fetchSolvedProblems();

    }, [user]);




    const filteredProblems = problems.filter(problem => {
        
        const difficultyMatch =
            filters.difficulty === 'all' || problem.difficulty === filters.difficulty;

        const tagMatch =
            filters.tag === 'all' || problem.tags.includes(filters.tag);

        const statusMatch =
            filters.status === 'all' || (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id));

        return difficultyMatch && tagMatch && statusMatch;
    });


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100 shadow-lg">
            <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
        );
    }


    return (

        
        
        <div className="min-h-screen bg-base-200">

            <Nav />
    

            {/* Main Content */}
            <div className="container mx-auto p-4">

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* New Status Filter */}
                    <select 
                        className="select select-bordered"
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                        <option value="all">All Problems</option>
                        <option value="solved">Solved Problems</option>
                    </select>

                    <select 
                        className="select select-bordered"
                        value={filters.difficulty}
                        onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select 
                        className="select select-bordered"
                        value={filters.tag}
                        onChange={(e) => setFilters({...filters, tag: e.target.value})}
                    >

                        {/* 'LinkedList', 'Graph', "Dynamic Programming", 'Stack', 'Queue', 'Array', 'Graph' */}
                        <option value="all">All Tags</option>
                        <option value="Array">Array</option>
                        <option value="Linked List">Linked List</option>
                        <option value="Graph">Graph</option>
                        <option value="Dynamic Programming">DP</option>
                    </select>
                </div>

                {/* Problems List */}
                <div className="grid gap-4">
                    {filteredProblems.map(problem => (
                        
                        <div key={problem._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <h2 className="card-title">
                                        <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                                        {problem.title}
                                        </NavLink>
                                    </h2>
                                    
                                    {solvedProblems.some(sp => sp._id === problem._id) && (
                                        <div className="badge badge-success gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Solved
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex gap-2">
                                    <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </div>
                                    
                                    <div className="badge badge-info">
                                        {problem.tags}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'badge-success';
        case 'medium': return 'badge-warning';
        case 'hard': return 'badge-error';
        default: return 'badge-neutral';
    }
};

export default Problems;
