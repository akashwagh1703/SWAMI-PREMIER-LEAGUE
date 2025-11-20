import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import config from '../../config/tournamentConfig';
import logo from '../../assets/images/swami-logo.png';

function Hero() {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-black to-primary-700/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-primary-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-primary-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <img src={logo} alt="Swami Logo" className="w-28 h-28 mx-auto drop-shadow-2xl filter brightness-110" />
          </motion.div>
          <motion.div
            className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg shadow-primary-500/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {config.hero.highlight}
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              background: 'linear-gradient(135deg, #FFC107 0%, #f97316 50%, #FFC107 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {config.hero.title}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-gray-400 mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {config.hero.subtitle}
          </motion.p>
          
          {config.hero.youtubeLive && (
            <motion.div 
              className="flex items-center justify-center gap-3 mb-8 bg-gray-800/50 backdrop-blur-sm inline-flex px-5 py-2.5 rounded-full border border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-white font-semibold text-base"><i className='bx bxl-youtube text-red-500'></i> YouTube Live Coverage</span>
            </motion.div>
          )}
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Link to="/register" className="btn-primary text-base">
              <i className='bx bx-user-plus mr-2'></i>Register Your Team
            </Link>
            <button className="btn-secondary text-base">
              <i className='bx bx-info-circle mr-2'></i>View Details
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}

export default Hero;
