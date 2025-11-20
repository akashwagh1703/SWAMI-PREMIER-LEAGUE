import { motion } from 'framer-motion';
import config from '../../config/tournamentConfig';

function Contact() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {config.contact.map((phone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className='bx bx-phone text-3xl'></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Contact {index + 1}</h3>
                <a 
                  href={`tel:${phone}`}
                  className="text-2xl font-bold text-primary-300 hover:text-primary-200 transition-colors"
                >
                  {phone}
                </a>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-4">For Queries & Registration Support</h3>
            <p className="text-gray-300">
              Call us between 10:00 AM - 8:00 PM for any tournament related queries, 
              registration assistance, or clarifications about rules and regulations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
