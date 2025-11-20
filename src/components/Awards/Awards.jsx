import { motion } from 'framer-motion';
import config from '../../config/tournamentConfig';

function Awards() {
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
            Awards & Trophies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {config.awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="section-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <p className="text-gray-200 font-medium text-left">{award}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Awards;
