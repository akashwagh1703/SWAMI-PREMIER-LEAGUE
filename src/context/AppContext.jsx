import { createContext, useContext, useReducer, useEffect } from 'react';
import { saveToSession, getFromSession, saveToIndexedDB, getAllFromIndexedDB } from '../utils/storage';

const AppContext = createContext();

const initialState = {
  registrationData: {
    company: {},
    captain: {},
    players: []
  },
  currentStep: 1,
  teams: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_COMPANY':
      const newStateCompany = {
        ...state,
        registrationData: {
          ...state.registrationData,
          company: action.payload
        }
      };
      saveToSession('registrationData', newStateCompany.registrationData);
      return newStateCompany;
    case 'UPDATE_CAPTAIN':
      const newStateCaptain = {
        ...state,
        registrationData: {
          ...state.registrationData,
          captain: action.payload
        }
      };
      saveToSession('registrationData', newStateCaptain.registrationData);
      return newStateCaptain;
    case 'UPDATE_PLAYERS':
      const newStatePlayers = {
        ...state,
        registrationData: {
          ...state.registrationData,
          players: action.payload
        }
      };
      saveToSession('registrationData', newStatePlayers.registrationData);
      return newStatePlayers;
    case 'SET_STEP':
      const newStateStep = {
        ...state,
        currentStep: action.payload
      };
      saveToSession('currentStep', newStateStep.currentStep);
      return newStateStep;
    case 'ADD_TEAM':
      const newTeam = action.payload;
      saveToIndexedDB(newTeam);
      return {
        ...state,
        teams: [...state.teams, newTeam]
      };
    case 'UPDATE_TEAM_STATUS':
      const updatedTeams = state.teams.map(team => {
        if (team.id === action.payload.id) {
          const updatedTeam = { ...team, status: action.payload.status };
          saveToIndexedDB(updatedTeam);
          return updatedTeam;
        }
        return team;
      });
      return {
        ...state,
        teams: updatedTeams
      };
    case 'LOAD_TEAMS':
      return {
        ...state,
        teams: action.payload
      };
    case 'CLEAR_REGISTRATION':
      saveToSession('registrationData', { company: {}, captain: {}, players: [] });
      saveToSession('currentStep', 1);
      return {
        ...state,
        registrationData: { company: {}, captain: {}, players: [] },
        currentStep: 1
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    registrationData: getFromSession('registrationData') || initialState.registrationData,
    currentStep: getFromSession('currentStep') || initialState.currentStep
  });

  useEffect(() => {
    const loadTeams = async () => {
      const teams = await getAllFromIndexedDB();
      dispatch({ type: 'LOAD_TEAMS', payload: teams });
    };
    loadTeams();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
