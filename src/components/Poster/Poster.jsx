import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import poster from '../../assets/images/poster.jpeg';

function Poster() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Official Tournament Poster
            </h2>
            <p className="text-base text-gray-400 mb-6">
              Get ready for the most exciting corporate cricket tournament of 2026! 
              Join us for an unforgettable experience filled with competitive matches, 
              team spirit, and amazing prizes.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className='bx bx-calendar-event text-primary-600 text-xl'></i>
                <span className="text-gray-200 font-medium">January 2026 Tournament</span>
              </div>
              <div className="flex items-center gap-3">
                <i className='bx bx-group text-primary-600 text-xl'></i>
                <span className="text-gray-200 font-medium">Corporate Teams Only</span>
              </div>
              <div className="flex items-center gap-3">
                <i className='bx bx-trophy text-primary-600 text-xl'></i>
                <span className="text-gray-200 font-medium">Amazing Prizes & Trophies</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                <i className='bx bx-user-plus mr-2'></i>Register Your Team
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-gray-700/50">
              <img 
                src={poster} 
                alt="Swami Corporate Premier League 2026 Tournament Poster" 
                className="w-full max-w-xs h-auto max-h-80 object-contain rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Poster;
