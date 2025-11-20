// Convert File to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !(file instanceof File || file instanceof Blob)) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Generate a unique shareable link for team registration details
export const generateRegistrationDocument = async (teamData) => {
  const registrationId = teamData.id;
  
  // Convert files to base64
  const playersWithFiles = await Promise.all(
    teamData.players.map(async (player) => ({
      ...player,
      corporateIdProofName: await fileToBase64(player.corporateIdProof),
      payslipName: await fileToBase64(player.payslip),
      corporateIdProof: null,
      payslip: null
    }))
  );
  
  const documentData = {
    ...teamData,
    companyProofName: await fileToBase64(teamData.companyProof),
    teamLogoName: await fileToBase64(teamData.teamLogo),
    corporateIdName: await fileToBase64(teamData.corporateId),
    companyProof: null,
    teamLogo: null,
    corporateId: null,
    players: playersWithFiles,
    generatedAt: new Date().toISOString(),
    documentId: registrationId
  };
  
  localStorage.setItem(`registration_${registrationId}`, JSON.stringify(documentData));
  
  const baseUrl = window.location.origin;
  const shareableLink = `${baseUrl}/registration-details/${registrationId}`;
  
  return {
    link: shareableLink,
    documentId: registrationId
  };
};

// Retrieve registration data by ID
export const getRegistrationById = (registrationId) => {
  const data = localStorage.getItem(`registration_${registrationId}`);
  return data ? JSON.parse(data) : null;
};