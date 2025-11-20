import { useState } from 'react';
import { motion } from 'framer-motion';
import { validatePlayer } from '../../../utils/validation';
import { generateId } from '../../../utils/helpers';
import { parseExcelData, downloadSampleExcel, readExcelFile } from '../../../utils/excelUtils';
import config from '../../../config/tournamentConfig';

function Step3Players({ data, onUpdate, onSubmit, onBack, companyDomain }) {
  const [players, setPlayers] = useState(data.length > 0 ? data : [createEmptyPlayer()]);
  const [errors, setErrors] = useState({});
  const [importMode, setImportMode] = useState('manual');
  const [importing, setImporting] = useState(false);

  function createEmptyPlayer() {
    return {
      id: generateId(),
      name: '',
      age: '',
      role: '',
      tshirtSize: '',
      corporateEmail: '',
      employeeId: '',
      corporateIdProof: null,
      payslip: null,
      verificationStatus: 'Pending'
    };
  }

  const addPlayer = () => {
    if (players.length < config.registrationForm.playerList.maxPlayers) {
      const newPlayers = [...players, createEmptyPlayer()];
      setPlayers(newPlayers);
      onUpdate(newPlayers); // Auto-save to session storage
    }
  };

  const removePlayer = (id) => {
    if (players.length > config.registrationForm.playerList.minPlayers) {
      const newPlayers = players.filter(p => p.id !== id);
      setPlayers(newPlayers);
      onUpdate(newPlayers); // Auto-save to session storage
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const updatePlayer = (id, field, value) => {
    const updatedPlayers = players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    setPlayers(updatedPlayers);
    onUpdate(updatedPlayers); // Auto-save to session storage
    
    if (errors[id]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [id]: { ...prev[id], [field]: '' }
      }));
    }
  };

  const handleExcelImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImporting(true);
    try {
      const data = await readExcelFile(file);
      const importedPlayers = parseExcelData(data);
      
      if (importedPlayers.length > 0) {
        setPlayers(importedPlayers.slice(0, config.registrationForm.playerList.maxPlayers));
        onUpdate(importedPlayers.slice(0, config.registrationForm.playerList.maxPlayers));
        setErrors({});
      }
    } catch (error) {
      alert('Error importing file. Please check the format.');
    }
    setImporting(false);
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (players.length < config.registrationForm.playerList.minPlayers) {
      alert(`Minimum ${config.registrationForm.playerList.minPlayers} players required`);
      return;
    }

    // Only validate if in manual mode
    if (importMode === 'manual') {
      const validationErrors = {};
      let hasErrors = false;

      players.forEach(player => {
        const playerErrors = validatePlayer(player, companyDomain);
        if (Object.keys(playerErrors).length > 0) {
          validationErrors[player.id] = playerErrors;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(validationErrors);
        alert('Please fix all validation errors before submitting.');
        return;
      }
    } else {
      // For imported data, check basic required fields
      const missingData = players.some(p => !p.name || !p.age || !p.role || !p.corporateEmail || !p.employeeId);
      if (missingData) {
        alert('Some imported players have missing required fields. Please check the data.');
        return;
      }
    }

    onUpdate(players);
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Player List</h2>
        <p className="text-gray-300">
          Step 3 of 3 - Add {config.registrationForm.playerList.minPlayers} to {config.registrationForm.playerList.maxPlayers} players
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Current players: {players.length} / {config.registrationForm.playerList.maxPlayers}
        </p>
        
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setImportMode('manual')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              importMode === 'manual' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-200 hover:bg-gray-300'
            }`}
          >
            <i className='bx bx-edit mr-2'></i>Manual Entry
          </button>
          <button
            type="button"
            onClick={() => setImportMode('import')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              importMode === 'import' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-200 hover:bg-gray-300'
            }`}
          >
            <i className='bx bx-upload mr-2'></i>Excel Import
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {importMode === 'import' && (
          <div className="section-card bg-primary-900/30 border-primary-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              <i className='bx bx-upload mr-2'></i>Import Players from Excel/CSV
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={downloadSampleExcel}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <i className='bx bx-download mr-2'></i>Download Sample File
                </button>
                
                <label className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors">
                  <i className='bx bx-file mr-2'></i>
                  {importing ? 'Importing...' : 'Choose Excel/CSV File'}
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleExcelImport}
                    className="hidden"
                    disabled={importing}
                  />
                </label>
              </div>
              
              <div className="text-sm text-gray-300">
                <p><strong>Required columns:</strong> Player Name, Age, Role, T-shirt Size, Corporate Email, Employee ID</p>
                <p><strong>Supported formats:</strong> CSV, Excel (.xlsx, .xls)</p>
              </div>
            </div>
          </div>
        )}
        {importMode === 'manual' && players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">
                Player {index + 1}
              </h3>
              {players.length > config.registrationForm.playerList.minPlayers && (
                <button
                  type="button"
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Player Name *
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                  className={`input-field ${errors[player.id]?.name ? 'border-red-500' : ''}`}
                  placeholder="Enter player name"
                />
                {errors[player.id]?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={player.age}
                  onChange={(e) => updatePlayer(player.id, 'age', e.target.value)}
                  className={`input-field ${errors[player.id]?.age ? 'border-red-500' : ''}`}
                  placeholder="Age"
                  min="18"
                  max="60"
                />
                {errors[player.id]?.age && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Role *
                </label>
                <select
                  value={player.role}
                  onChange={(e) => updatePlayer(player.id, 'role', e.target.value)}
                  className={`input-field ${errors[player.id]?.role ? 'border-red-500' : ''}`}
                >
                  <option value="">Select role</option>
                  {config.registrationForm.playerList.roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors[player.id]?.role && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].role}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  T-shirt Size *
                </label>
                <select
                  value={player.tshirtSize}
                  onChange={(e) => updatePlayer(player.id, 'tshirtSize', e.target.value)}
                  className={`input-field ${errors[player.id]?.tshirtSize ? 'border-red-500' : ''}`}
                >
                  <option value="">Select size</option>
                  {config.registrationForm.playerList.tshirtSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors[player.id]?.tshirtSize && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].tshirtSize}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  value={player.corporateEmail}
                  onChange={(e) => updatePlayer(player.id, 'corporateEmail', e.target.value)}
                  className={`input-field ${errors[player.id]?.corporateEmail ? 'border-red-500' : ''}`}
                  placeholder={`player@${companyDomain || 'company.com'}`}
                />
                {errors[player.id]?.corporateEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].corporateEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Employee ID *
                </label>
                <input
                  type="text"
                  value={player.employeeId}
                  onChange={(e) => updatePlayer(player.id, 'employeeId', e.target.value)}
                  className={`input-field ${errors[player.id]?.employeeId ? 'border-red-500' : ''}`}
                  placeholder="Employee ID"
                />
                {errors[player.id]?.employeeId && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].employeeId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Corporate ID Proof *
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => updatePlayer(player.id, 'corporateIdProof', e.target.files[0])}
                  className={`input-field ${errors[player.id]?.corporateIdProof ? 'border-red-500' : ''}`}
                />
                {errors[player.id]?.corporateIdProof && (
                  <p className="text-red-500 text-sm mt-1">{errors[player.id].corporateIdProof}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Payslip (Optional)
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => updatePlayer(player.id, 'payslip', e.target.files[0])}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-300">
                Verification Status: 
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {player.verificationStatus}
                </span>
              </span>
            </div>
          </motion.div>
        ))}

        {importMode === 'manual' && players.length < config.registrationForm.playerList.maxPlayers && (
          <button
            type="button"
            onClick={addPlayer}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
          >
            + Add Player ({players.length}/{config.registrationForm.playerList.maxPlayers})
          </button>
        )}
        
        {importMode === 'import' && players.length > 0 && (
          <div className="section-card">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-semibold">
                <i className='bx bx-check-circle mr-2'></i>
                {players.length} players imported successfully! Review the list below and click "Submit Registration" to complete.
              </p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Imported Players ({players.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {players.map((player, index) => (
                <div key={player.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{player.name || 'No Name'}</span>
                    <span className="text-gray-300 ml-2">({player.role || 'No Role'})</span>
                    <span className="text-gray-400 ml-2 text-sm">{player.corporateEmail || 'No Email'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlayer(player.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    <i className='bx bx-trash'></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 bg-primary-900/30 border border-primary-700 rounded-lg p-4">
              <p className="text-primary-800 text-sm">
                <i className='bx bx-info-circle mr-2'></i>
                <strong>Note:</strong> File uploads (ID proofs, payslips) will need to be submitted separately after registration approval.
              </p>
            </div>
          </div>
        )}
        
        {importMode === 'import' && players.length === 0 && (
          <div className="section-card bg-yellow-900/30 border-yellow-700">
            <p className="text-yellow-800 text-center">
              <i className='bx bx-info-circle mr-2'></i>
              No players imported yet. Please upload an Excel/CSV file above.
            </p>
          </div>
        )}

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
            Submit Registration
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Step3Players;
