# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your email account
5. Copy the **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Copy the template content from `src/utils/emailService.js` (the commented section)
4. Paste it in the template editor
5. Save and copy the **Template ID**

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update Configuration
Open `src/utils/emailService.js` and replace:
```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

## Step 6: Test
1. Submit a test registration
2. Check akash.wagh@gmail.com for the email
3. Check EmailJS dashboard for email logs

## Email Template Variables
The following variables are automatically sent:
- {{to_email}} - akash.wagh@gmail.com
- {{cc_email}} - Captain's email
- {{company_name}} - Company name
- {{team_name}} - Team name
- {{company_id}} - Company ID
- {{company_domain}} - Company domain
- {{captain_name}} - Captain name
- {{captain_email}} - Captain email
- {{captain_mobile}} - Captain mobile
- {{captain_employee_id}} - Captain employee ID
- {{total_players}} - Number of players
- {{players_list}} - Formatted player list
- {{submission_date}} - Submission date/time
- {{tournament_name}} - Tournament name

## Free Tier Limits
- 200 emails per month
- Upgrade for more emails if needed

## Alternative: Backend Solution
For production with attachments (poster, ID proofs), consider:
- Node.js + Nodemailer
- AWS SES
- SendGrid
- Mailgun

These allow file attachments which EmailJS free tier doesn't support.