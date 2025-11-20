import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import config from '../../config/tournamentConfig';

function EntryFee() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50/30 to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-100 mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            Team Entry Fee
          </motion.h2>
          <p className="text-base text-gray-400 mb-8">Affordable pricing with amazing inclusions!</p>
          
          <motion.div 
            className="relative group max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-4">
                {config.entryFee.amount}
              </div>
              
              <div className="text-gray-200 mb-6">
                <p className="font-bold text-lg mb-3 text-gray-100">Package Includes:</p>
                <ul className="space-y-3">
                  {config.entryFee.includes.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center justify-center gap-3 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <i className='bx bx-check-circle text-primary-500 text-xl'></i>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-4 rounded-xl border border-primary-500/50">
                <p className="text-primary-800 font-semibold mb-4">
                  <i className='bx bx-credit-card mr-2'></i>Payment details will be shared after registration approval
                </p>
                <Link to="/register" className="btn-primary inline-flex items-center">
                  <i className='bx bx-user-plus mr-2'></i>Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default EntryFee;
