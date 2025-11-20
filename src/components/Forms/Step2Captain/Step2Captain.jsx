import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateStep2 } from '../../../utils/validation';

function Step2Captain({ data, onUpdate, onNext, onBack, companyDomain }) {
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
    const validationErrors = validateStep2(formData, companyDomain);
    
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
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Captain Details</h2>
        <p className="text-gray-300">Step 2 of 3 - Captain Verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Captain Name *
          </label>
          <input
            type="text"
            value={formData.captainName || ''}
            onChange={(e) => handleChange('captainName', e.target.value)}
            className={`input-field ${errors.captainName ? 'border-red-500' : ''}`}
            placeholder="Enter captain's full name"
          />
          {errors.captainName && (
            <p className="text-red-500 text-sm mt-1">{errors.captainName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Corporate Email *
          </label>
          <input
            type="email"
            value={formData.corporateEmail || ''}
            onChange={(e) => handleChange('corporateEmail', e.target.value)}
            className={`input-field ${errors.corporateEmail ? 'border-red-500' : ''}`}
            placeholder={`captain@${companyDomain || 'company.com'}`}
          />
          {errors.corporateEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.corporateEmail}</p>
          )}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobile || ''}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className={`input-field ${errors.mobile ? 'border-red-500' : ''}`}
            placeholder="9876543210"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Employee ID *
          </label>
          <input
            type="text"
            value={formData.employeeId || ''}
            onChange={(e) => handleChange('employeeId', e.target.value)}
            className={`input-field ${errors.employeeId ? 'border-red-500' : ''}`}
            placeholder="Enter employee ID"
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Corporate ID Card *
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileChange('corporateId', e.target.files[0])}
            className={`input-field ${errors.corporateId ? 'border-red-500' : ''}`}
          />
          {errors.corporateId && (
            <p className="text-red-500 text-sm mt-1">{errors.corporateId}</p>
          )}
          <p className="text-sm text-gray-400 mt-1">
            Upload company ID card or employee badge
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-200 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary"
          >
            Continue to Player List
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Step2Captain;
