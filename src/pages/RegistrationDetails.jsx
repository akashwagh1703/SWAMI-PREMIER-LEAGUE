import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRegistrationById } from '../utils/documentGenerator';

function RegistrationDetails() {
  const { id } = useParams();
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const data = getRegistrationById(id);
    setTeamData(data);
  }, [id]);

  if (!teamData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Registration Not Found</h1>
          <p className="text-gray-400">The registration details you're looking for don't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-800">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-primary-500 mb-2">Team Registration Details</h1>
            <p className="text-gray-400">Swami Corporate Premier League 2026</p>
          </div>

          {/* Company Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <i className='bx bx-building text-primary-500'></i> Company Details
            </h2>
            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Company Name</p>
                  <p className="text-gray-100 font-medium">{teamData.companyName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Company ID</p>
                  <p className="text-gray-100 font-medium">{teamData.companyId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Domain</p>
                  <p className="text-gray-100 font-medium">{teamData.companyDomain}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Team Name</p>
                  <p className="text-primary-500 font-bold">{teamData.teamName}</p>
                </div>
              </div>
              
              {/* Company Documents */}
              <div className="space-y-3 mt-4">
                {teamData.teamLogoName && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Team Logo</p>
                    <a href={teamData.teamLogoName} download="team-logo" className="block bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-2">
                        <i className='bx bx-download text-primary-500 text-xl'></i>
                        <span className="text-primary-400 text-sm underline">Download Team Logo</span>
                      </div>
                    </a>
                  </div>
                )}
                {teamData.companyProofName && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Company Proof</p>
                    <a href={teamData.companyProofName} download="company-proof" className="block bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-2">
                        <i className='bx bx-download text-primary-500 text-xl'></i>
                        <span className="text-primary-400 text-sm underline">Download Company Proof</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Captain Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <i className='bx bx-user text-primary-500'></i> Captain Details
            </h2>
            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-gray-100 font-medium">{teamData.captainName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-gray-100 font-medium">{teamData.corporateEmail}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mobile</p>
                  <p className="text-gray-100 font-medium">{teamData.mobile}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Employee ID</p>
                  <p className="text-gray-100 font-medium">{teamData.employeeId}</p>
                </div>
              </div>
              
              {/* Captain ID Card */}
              {teamData.corporateIdName && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Corporate ID Card</p>
                  <a href={teamData.corporateIdName} download="captain-id" className="block bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <i className='bx bx-download text-primary-500 text-xl'></i>
                      <span className="text-primary-400 text-sm underline">Download Corporate ID</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Players List */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <i className='bx bx-group text-primary-500'></i> Players List ({teamData.players?.length || 0})
            </h2>
            <div className="space-y-3">
              {teamData.players?.map((player, index) => (
                <div key={player.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-gray-400 text-xs">Name</p>
                        <p className="text-gray-100 font-medium text-sm">{player.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Role</p>
                        <p className="text-gray-100 font-medium text-sm">{player.role}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Age</p>
                        <p className="text-gray-100 font-medium text-sm">{player.age}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">T-Shirt</p>
                        <p className="text-gray-100 font-medium text-sm">{player.tshirtSize}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-400 text-xs">Email</p>
                        <p className="text-gray-100 font-medium text-sm">{player.corporateEmail}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Employee ID</p>
                        <p className="text-gray-100 font-medium text-sm">{player.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Status</p>
                        <span className="inline-block px-2 py-1 bg-yellow-900/30 text-yellow-500 rounded text-xs">
                          {player.verificationStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Player Documents */}
                  {(player.corporateIdProofName || player.payslipName) && (
                    <div className="mt-3 pt-3 border-t border-gray-700 flex gap-2">
                      {player.corporateIdProofName && (
                        <a href={player.corporateIdProofName} download={`${player.name}-id`} className="flex-1 bg-gray-700 rounded p-2 hover:bg-gray-600 transition-colors">
                          <div className="flex items-center gap-2">
                            <i className='bx bx-download text-primary-500 text-sm'></i>
                            <span className="text-primary-400 text-xs underline">ID Proof</span>
                          </div>
                        </a>
                      )}
                      {player.payslipName && (
                        <a href={player.payslipName} download={`${player.name}-payslip`} className="flex-1 bg-gray-700 rounded p-2 hover:bg-gray-600 transition-colors">
                          <div className="flex items-center gap-2">
                            <i className='bx bx-download text-primary-500 text-sm'></i>
                            <span className="text-primary-400 text-xs underline">Payslip</span>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submission Info */}
          <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Submitted At</p>
                <p className="text-gray-100 font-medium">{new Date(teamData.submittedAt).toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <span className="inline-block px-3 py-1 bg-yellow-900/30 text-yellow-500 rounded-full text-sm font-medium">
                  {teamData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.print()}
              className="btn-primary"
            >
              <i className='bx bx-printer mr-2'></i>Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationDetails;