import emailjs from '@emailjs/browser';
import { generateRegistrationDocument } from './documentGenerator';

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ and get your credentials
const EMAILJS_SERVICE_ID = 'service_x4r6sxj'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_o796ur9'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = '7IS-OWHjfFHCrAwe3'; // Replace with your EmailJS public key

export const sendRegistrationEmail = async (teamData) => {
  try {
    // Generate shareable document link
    const { link } = await generateRegistrationDocument(teamData);

    // Email template parameters
    const templateParams = {
      to_email: 'awagh1703@gmail.com',
      cc_email: teamData.corporateEmail,
      company_name: teamData.companyName,
      team_name: teamData.teamName,
      captain_name: teamData.captainName,
      captain_email: teamData.corporateEmail,
      captain_mobile: teamData.mobile,
      total_players: teamData.players.length,
      submission_date: new Date().toLocaleString('en-IN'),
      tournament_name: 'Swami Corporate Premier League 2026',
      registration_link: link
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

// Email template for EmailJS (Copy this to your EmailJS template):
/*
Subject: New Team Registration - {{company_name}} - {{tournament_name}}

Dear Admin,

A new team has registered for {{tournament_name}}.

COMPANY DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company Name: {{company_name}}
Company ID: {{company_id}}
Company Domain: {{company_domain}}
Team Name: {{team_name}}

CAPTAIN DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{captain_name}}
Email: {{captain_email}}
Mobile: {{captain_mobile}}
Employee ID: {{captain_employee_id}}

PLAYER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Players: {{total_players}}

{{players_list}}

SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: {{submission_date}}
Status: Pending Verification

Please review and verify the registration details.

Best regards,
SCPL 2026 Registration System
*/