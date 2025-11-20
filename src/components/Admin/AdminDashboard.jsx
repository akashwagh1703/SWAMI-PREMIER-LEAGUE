import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

function AdminDashboard() {
  const { state, dispatch } = useApp();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const updateTeamStatus = (teamId, status) => {
    dispatch({
      type: 'UPDATE_TEAM_STATUS',
      payload: { id: teamId, status }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-100">Team Registrations</h1>
        <div className="text-sm text-gray-300">
          Total Teams: {state.teams.length}
        </div>
      </div>

      <div className="grid gap-6">
        {state.teams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No team registrations yet</p>
          </div>
        ) : (
          state.teams.map((team) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{team.teamName}</h3>
                  <p className="text-gray-300">{team.companyName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(team.status)}`}>
                  {team.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-300">Company ID</p>
                  <p className="font-medium">{team.companyId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Captain</p>
                  <p className="font-medium">{team.captainName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Contact</p>
                  <p className="font-medium">{team.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Players</p>
                  <p className="font-medium">{team.players?.length || 0} players</p>
                </div>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {selectedTeam === team.id ? 'Hide' : 'View'} Player Details
                </button>
              </div>

              {selectedTeam === team.id && team.players && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t pt-4"
                >
                  <h4 className="font-semibold mb-3">Player List:</h4>
                  <div className="space-y-2">
                    {team.players.map((player, index) => (
                      <div key={player.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                        <div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-gray-300 ml-2">({player.role})</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(player.verificationStatus)}`}>
                          {player.verificationStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {team.status === 'Pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateTeamStatus(team.id, 'Approved')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Approve Team
                  </button>
                  <button
                    onClick={() => updateTeamStatus(team.id, 'Rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Reject Team
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
