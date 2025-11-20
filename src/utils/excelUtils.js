import { generateId } from './helpers';

export const parseExcelData = (data) => {
  const players = [];
  
  // Skip header row, start from index 1
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row && row.length >= 5) { // Minimum required columns
      players.push({
        id: generateId(),
        name: row[0] || '',
        age: row[1] || '',
        role: row[2] || '',
        tshirtSize: row[3] || '',
        corporateEmail: row[4] || '',
        employeeId: row[5] || '',
        corporateIdProof: null,
        payslip: null,
        verificationStatus: 'Pending'
      });
    }
  }
  
  return players;
};

export const generateSampleExcel = () => {
  const sampleData = [
    ['Player Name', 'Age', 'Role', 'T-shirt Size', 'Corporate Email', 'Employee ID'],
    ['John Doe', '28', 'Batsman', 'L', 'john.doe@company.com', 'EMP001'],
    ['Jane Smith', '25', 'Bowler', 'M', 'jane.smith@company.com', 'EMP002'],
    ['Mike Johnson', '30', 'All-rounder', 'XL', 'mike.johnson@company.com', 'EMP003'],
    ['Sarah Wilson', '27', 'Wicketkeeper', 'S', 'sarah.wilson@company.com', 'EMP004'],
    ['David Brown', '29', 'Batsman', 'L', 'david.brown@company.com', 'EMP005'],
    ['Lisa Davis', '26', 'Bowler', 'M', 'lisa.davis@company.com', 'EMP006'],
    ['Tom Miller', '31', 'All-rounder', 'XL', 'tom.miller@company.com', 'EMP007'],
    ['Amy Taylor', '24', 'Batsman', 'S', 'amy.taylor@company.com', 'EMP008']
  ];
  
  return sampleData;
};

export const downloadSampleExcel = () => {
  const data = generateSampleExcel();
  let csvContent = '';
  
  data.forEach(row => {
    csvContent += row.join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'player_list_sample.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = text.split('\n').map(row => 
          row.split(',').map(cell => cell.trim().replace(/"/g, ''))
        );
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
