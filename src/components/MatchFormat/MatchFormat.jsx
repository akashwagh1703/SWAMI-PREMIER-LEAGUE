import { motion } from 'framer-motion';
import config from '../../config/tournamentConfig';

function MatchFormat() {
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
            Match Format & Rules
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {config.matchFormat.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="section-card text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    <i className='bx bx-check text-lg'></i>
                  </div>
                  <p className="text-gray-200 font-medium">{rule}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MatchFormat;
