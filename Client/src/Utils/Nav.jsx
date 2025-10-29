import { logoutUser } from '../authSlice';
import {useSelector ,useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router';





export default function Nav() {


   const { user, isAuthenticated } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   // const [solvedProblems, setSolvedProblems] = useState([]);


   // const fetchSolvedProblems = async () => {
   //    try {
   //       const { data } = await axiosClient.get('/problem/problemSolvedByUser');
   //       // console.log(data);
   //       // setSolvedProblems(data);
   //    } 
   //    catch (error) {
   //       console.error('Error fetching solved problems:', error);
   //    }
   // };

   // useEffect(() => {
   //    fetchSolvedProblems();
   // }, []);

      


   const handleLogout = () => {
      dispatch(logoutUser());
   };

   return (

      <nav className="navbar bg-base-100 shadow-lg px-4">

         <div className="flex-1 bg-center">
            <NavLink to="/" className="btn btn-ghost text-xl">codeX</NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/" className="btn btn-ghost rounded-2xl">Home</NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/problem" className="btn btn-ghost rounded-2xl"> Problems </NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/contest" className="btn btn-ghost rounded-2xl"> Contests </NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/subscription" className="btn btn-ghost rounded-2xl"> Subscription </NavLink>
         </div>

         <div className="flex-none gap-4">

            <div className="dropdown dropdown-end">
               <div tabIndex={0} className="btn btn-ghost rounded-2xl">
                  {user?.firstName}
               </div>
               <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><button onClick={handleLogout}>Logout</button></li>
                  {user?.role == 'admin' && <li><NavLink to='/admin'>Admin</NavLink></li>}
                  {isAuthenticated ? <li><NavLink to='/profile'>Profile</NavLink></li> : <Navigate to="/login"></Navigate>}
               </ul>
            </div>
         </div>
      </nav>

   );
}
