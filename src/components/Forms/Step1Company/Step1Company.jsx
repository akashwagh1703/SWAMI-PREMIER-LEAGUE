import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateStep1 } from '../../../utils/validation';
import config from '../../../config/tournamentConfig';

function Step1Company({ data, onUpdate, onNext }) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData); // Auto-save to session storage
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (field, file) => {
    const newData = { ...formData, [field]: file };
    setFormData(newData);
    onUpdate(newData); // Auto-save to session storage
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onUpdate(formData);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Company & Team Details</h2>
        <p className="text-gray-300">Step 1 of 3 - Company Verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.companyName || ''}
            onChange={(e) => handleChange('companyName', e.target.value)}
            className={`input-field ${errors.companyName ? 'border-red-500' : ''}`}
            placeholder="Enter your company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Company ID *
          </label>
          <input
            type="text"
            value={formData.companyId || ''}
            onChange={(e) => handleChange('companyId', e.target.value)}
            className={`input-field ${errors.companyId ? 'border-red-500' : ''}`}
            placeholder="Enter company registration ID"
          />
          {errors.companyId && (
            <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Company Email Domain *
          </label>
          <input
            type="text"
            value={formData.companyDomain || ''}
            onChange={(e) => handleChange('companyDomain', e.target.value)}
            className={`input-field ${errors.companyDomain ? 'border-red-500' : ''}`}
            placeholder="example.com"
          />
          {errors.companyDomain && (
            <p className="text-red-500 text-sm mt-1">{errors.companyDomain}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            HR Email (Optional)
          </label>
          <input
            type="email"
            value={formData.hrEmail || ''}
            onChange={(e) => handleChange('hrEmail', e.target.value)}
            className={`input-field ${errors.hrEmail ? 'border-red-500' : ''}`}
            placeholder="hr@company.com"
          />
          {errors.hrEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.hrEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Team Name *
          </label>
          <input
            type="text"
            value={formData.teamName || ''}
            onChange={(e) => handleChange('teamName', e.target.value)}
            className={`input-field ${errors.teamName ? 'border-red-500' : ''}`}
            placeholder="Enter your team name"
          />
          {errors.teamName && (
            <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Team Logo (Optional)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('teamLogo', e.target.files[0])}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Company Registration Proof *
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileChange('companyProof', e.target.files[0])}
            className={`input-field ${errors.companyProof ? 'border-red-500' : ''}`}
          />
          {errors.companyProof && (
            <p className="text-red-500 text-sm mt-1">{errors.companyProof}</p>
          )}
          <p className="text-sm text-gray-400 mt-1">
            Upload company registration certificate or incorporation document
          </p>
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Continue to Captain Details
        </button>
      </form>
    </motion.div>
  );
}

export default Step1Company;
