export const validateEmail = (email) => {
  return email && email.includes('@') && email.includes('.');
};

export const validateDomain = (domain) => {
  return domain && domain.includes('.');
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateFile = (file, allowedTypes = ['jpg', 'jpeg', 'png', 'pdf']) => {
  if (!file || !file.name) return false;
  const fileExtension = file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileExtension);
};

export const validateEmailDomain = (email, companyDomain) => {
  if (!email) return false;
  return validateEmail(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim() !== '';
};

export const validateStep1 = (data) => {
  const errors = {};
  
  if (!validateRequired(data.companyName)) {
    errors.companyName = 'Company name is required';
  }
  
  if (!validateRequired(data.companyId)) {
    errors.companyId = 'Company ID is required';
  }
  
  if (!validateRequired(data.companyDomain)) {
    errors.companyDomain = 'Company domain is required';
  } else if (!validateDomain(data.companyDomain)) {
    errors.companyDomain = 'Invalid domain format';
  }
  
  if (data.hrEmail && !validateEmail(data.hrEmail)) {
    errors.hrEmail = 'Invalid email format';
  }
  
  if (!data.companyProof) {
    errors.companyProof = 'Company proof is required';
  } else if (!validateFile(data.companyProof)) {
    errors.companyProof = 'Invalid file type';
  }
  
  return errors;
};

export const validateStep2 = (data, companyDomain) => {
  const errors = {};
  
  if (!validateRequired(data.captainName)) {
    errors.captainName = 'Captain name is required';
  }
  
  if (!validateRequired(data.corporateEmail)) {
    errors.corporateEmail = 'Corporate email is required';
  } else if (!validateEmail(data.corporateEmail)) {
    errors.corporateEmail = 'Invalid email format';
  }
  
  if (!validateRequired(data.mobile)) {
    errors.mobile = 'Mobile number is required';
  } else if (!validatePhone(data.mobile)) {
    errors.mobile = 'Invalid mobile number';
  }
  
  if (!validateRequired(data.employeeId)) {
    errors.employeeId = 'Employee ID is required';
  }
  
  if (!data.corporateId) {
    errors.corporateId = 'Corporate ID card is required';
  } else if (!validateFile(data.corporateId)) {
    errors.corporateId = 'Invalid file type';
  }
  
  return errors;
};

export const validatePlayer = (player, companyDomain) => {
  const errors = {};
  
  if (!validateRequired(player.name)) {
    errors.name = 'Player name is required';
  }
  
  if (!validateRequired(player.age)) {
    errors.age = 'Age is required';
  }
  
  if (!validateRequired(player.role)) {
    errors.role = 'Role is required';
  }
  
  if (!validateRequired(player.tshirtSize)) {
    errors.tshirtSize = 'T-shirt size is required';
  }
  
  if (!validateRequired(player.corporateEmail)) {
    errors.corporateEmail = 'Corporate email is required';
  } else if (!validateEmail(player.corporateEmail)) {
    errors.corporateEmail = 'Invalid email format';
  }
  
  if (!validateRequired(player.employeeId)) {
    errors.employeeId = 'Employee ID is required';
  }
  
  if (!player.corporateIdProof) {
    errors.corporateIdProof = 'Corporate ID proof is required';
  } else if (!validateFile(player.corporateIdProof)) {
    errors.corporateIdProof = 'Invalid file type';
  }
  
  return errors;
};
