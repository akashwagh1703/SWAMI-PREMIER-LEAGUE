import { motion } from 'framer-motion';
import config from '../../config/tournamentConfig';

function Venue() {
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
            Tournament Venue
          </h2>
          
          <div className="section-card max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <i className='bx bx-map text-4xl'></i>
            </div>
            
            <h3 className="text-xl font-bold text-gray-100 mb-4">Venue Location</h3>
            <p className="text-lg text-gray-300 mb-6">{config.venue}</p>
            
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-primary-700">
                <i className='bx bx-info-circle mr-2'></i>Exact venue details will be announced soon. All matches will be played on professional turf grounds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Venue;
