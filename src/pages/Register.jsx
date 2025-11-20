import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { generateId } from '../utils/helpers';
import { sendRegistrationEmail } from '../utils/emailService';
import Step1Company from '../components/Forms/Step1Company/Step1Company';
import Step2Captain from '../components/Forms/Step2Captain/Step2Captain';
import Step3Players from '../components/Forms/Step3Players/Step3Players';

function Register() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStep1Update = (data) => {
    dispatch({ type: 'UPDATE_COMPANY', payload: data });
  };

  const handleStep2Update = (data) => {
    dispatch({ type: 'UPDATE_CAPTAIN', payload: data });
  };

  const handleStep3Update = (data) => {
    dispatch({ type: 'UPDATE_PLAYERS', payload: data });
  };

  const handleFinalSubmit = async () => {
    console.log('handleFinalSubmit called');
    const teamData = {
      id: generateId(),
      ...state.registrationData.company,
      ...state.registrationData.captain,
      players: state.registrationData.players,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    console.log('Team data prepared:', teamData);
    dispatch({ type: 'ADD_TEAM', payload: teamData });
    
    // Send email notification (document generation happens inside)
    console.log('Sending email...');
    try {
      const emailResult = await sendRegistrationEmail(teamData);
      console.log('Email result:', emailResult);
      if (emailResult.success) {
        console.log('Email sent successfully');
        alert('Registration submitted and email sent!');
      } else {
        console.error('Email sending failed:', emailResult.error);
        alert('Registration saved but email failed to send. Check console.');
      }
    } catch (error) {
      console.error('Email error:', error);
      alert('Email error: ' + error.message);
    }
    
    setShowSuccess(true);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center section-card"
        >
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your team registration has been submitted successfully. You will receive a confirmation email once your registration is verified.
          </p>
          <div className="space-y-3">
            <Link to="/" className="block btn-primary">
              Back to Home
            </Link>
            <button
              onClick={() => {
                setShowSuccess(false);
                setCurrentStep(1);
                dispatch({ type: 'CLEAR_REGISTRATION' });
              }}
              className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Register Another Team
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="text-primary-500 hover:text-primary-400 font-medium">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-100 mt-4 mb-2">Team Registration</h1>
            <p className="text-gray-300">Swami Corporate Premier League 2026</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary-600' : 'bg-gray-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Company</span>
              <span>Captain</span>
              <span>Players</span>
            </div>
          </div>

          <div className="section-card">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1Company
                  key="step1"
                  data={state.registrationData.company}
                  onUpdate={handleStep1Update}
                  onNext={nextStep}
                />
              )}
              {currentStep === 2 && (
                <Step2Captain
                  key="step2"
                  data={state.registrationData.captain}
                  onUpdate={handleStep2Update}
                  onNext={nextStep}
                  onBack={prevStep}
                  companyDomain={state.registrationData.company.companyDomain}
                />
              )}
              {currentStep === 3 && (
                <Step3Players
                  key="step3"
                  data={state.registrationData.players}
                  onUpdate={handleStep3Update}
                  onSubmit={handleFinalSubmit}
                  onBack={prevStep}
                  companyDomain={state.registrationData.company.companyDomain}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
