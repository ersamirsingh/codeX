import { NavLink } from 'react-router';
import Nav from '../Utils/Nav';
import AboutUs from '../Utils/AboutUs';
import ContestList from '../Utils/ContestCard';

function HomePage() {



  
  return (
    <div className="min-h-screen bg-base-200 relative">
      <Nav />

      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 min-w-full min-h-full object-cover -z-10"
        style={{ filter: 'brightness(0.3)' }}
      >
        <source src={null} type="video/mp4" />
      </video>

      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
            Code. Learn. Compete
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the fastest growing coding platform for developers
          </p>
          <NavLink to="/problem">
            <button className="btn btn-primary btn-lg">Start Coding Now</button>
          </NavLink>
        </div>
      </div>

      <ContestList />
      <AboutUs />
      
    </div>
  );
}

export default HomePage;
