import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Problems from './Pages/Problem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './authSlice';
import CreateProblem from './Components/CreateProblem';
import ProblemPage from './Pages/ProblemPage';
import DeleteProblem from './Components/DeleteProblem';
import Admin from './Pages/Admin';
import UploadVideo from './Components/UploadVideo';
import AdminUpload from './Components/AdminUpload';
import UpdateProblem from './Components/UpdateProblem';
import UpdateProblemList from './Components/UpdateProblemList';
import HomePage from './Pages/Home';
import Contest from './Pages/Contest';
import Subscription from './Pages/Subscription';
// import Subscription from
import Profile from './Pages/Profile';






function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login></Login>}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup></Signup>}
        ></Route>

        <Route
          path="/admin"
          element={
            isAuthenticated && user?.role == 'admin' ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/admin/problem/create"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <CreateProblem />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/problem/update"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UpdateProblemList />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/problem/update/:id"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UpdateProblem />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/problem/delete"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <DeleteProblem />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/video"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UploadVideo />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/video/upload/:problemId"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <AdminUpload />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/problem"
          element={isAuthenticated ? <Problems /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/problem/:problemId"
          element={isAuthenticated ? <ProblemPage /> : <Navigate to="/" />}
        ></Route>

        <Route
          path="/contest"
          element={isAuthenticated ? <Contest /> : <Navigate to="/login" />}
        ></Route>
        {/* <Route path="/admin/contest/delete" element={isAuthenticated ? <CreateContest/> : <Navigate to="/login" />}></Route>
            <Route path="/admin/contest/update" element={isAuthenticated ? <UpdateContest/> : <Navigate to="/login" />}></Route>
            <Route path="/admin/contest/delte" element={isAuthenticated ? <DeleteContest/> : <Navigate to="/login" />}></Route> */}

        <Route
          path="/subscription"
          element={
            isAuthenticated ? <Subscription /> : <Navigate to="/login" />
          }
        ></Route>

        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
