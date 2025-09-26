import Nav from '../Utils/Nav';
import ContestCard from '../Utils/ContestCard';

export default function Contest() {
  
  return (
    <div className="min-h-screen bg-base-200">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-base-content mb-6">
          Welcome to the Coding Contest Platform
        </h1>
        <p className="text-center text-base-content/70 mb-12">
          Participate in exciting coding contests and enhance your skills!
        </p>
      </div>

      {/* <ActiveContest data={data}/> */}
      <ContestCard />
    </div>
  );
}
