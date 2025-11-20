import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import config from '../../config/tournamentConfig';

function Dates() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
            Important Dates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="section-card"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className='bx bx-play-circle text-3xl'></i>
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">Tournament Starts</h3>
                <p className="text-2xl font-bold text-primary-600">{config.dates.start}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="section-card"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className='bx bx-calendar text-3xl'></i>
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">Registration Deadline</h3>
                <p className="text-2xl font-bold text-red-600">{config.dates.registrationDeadline}</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-red-900/30 border border-red-700 rounded-lg p-6"
          >
            <p className="text-red-800 font-semibold mb-4">
              <i className='bx bx-error mr-2'></i>Limited slots available! Register early to secure your team's spot.
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center">
              <i className='bx bx-user-plus mr-2'></i>Register Before Deadline
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Dates;
