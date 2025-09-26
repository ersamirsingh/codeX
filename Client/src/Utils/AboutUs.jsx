import {
  FaCode,
  FaLaptopCode,
  FaTrophy,
  FaClock,
  FaUsers,
  FaStar,
} from 'react-icons/fa';


export default function AboutUs(){


  //  console.log('first')

   return (

      <div className="py-20 bg-base-100/95">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="card bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <FaLaptopCode className="text-5xl mb-4 text-primary" />
                <h3 className="card-title text-2xl">Interactive Learning</h3>
                <p>Learn by doing with our interactive code editor</p>
              </div>
            </div>

            <div className="card bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <FaUsers className="text-5xl mb-4 text-secondary" />
                <h3 className="card-title text-2xl">Community</h3>
                <p>Connect with millions of developers worldwide</p>
              </div>
            </div>

            <div className="card bg-accent/10 hover:bg-accent/20 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <FaTrophy className="text-5xl mb-4 text-accent" />
                <h3 className="card-title text-2xl">Competitions</h3>
                <p>Participate in contests and win prizes</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
   )
}