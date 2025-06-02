# Contact Form Setup Guide

This guide explains how to set up the contact form to send emails using EmailJS.

## EmailJS Setup

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
   - The free tier allows 200 emails per month

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Design your email template with the following variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{phone}}` - Sender's phone number
     - `{{service_requested}}` - Service the user is interested in
     - `{{message}}` - The message content
     - `{{reply_to}}` - Reply-to email (same as from_email)

4. **Get Your Credentials**
   - Note your "Service ID" from the Email Services page
   - Note your "Template ID" from the Email Templates page
   - Go to "Account" > "API Keys" to get your "Public Key"

## Update the Code

1. Open `src/services/emailService.ts`

2. Replace the placeholder values with your actual EmailJS credentials:
   ```typescript
   const SERVICE_ID = 'your_service_id'; // Replace with your Service ID
   const TEMPLATE_ID = 'your_template_id'; // Replace with your Template ID
   const PUBLIC_KEY = 'your_public_key'; // Replace with your Public Key
   ```

3. Save the file

## Testing the Contact Form

1. After updating the credentials, the contact form will send real emails when submitted
2. If the credentials are not set, the form will operate in "Demo Mode" and simulate sending emails

## Troubleshooting

- **Emails not sending**: Check the browser console for error messages
- **Rate limiting**: The free tier of EmailJS has limits on how many emails you can send
- **Spam filters**: Make sure to check your spam folder if test emails aren't arriving

## Security Considerations

- The EmailJS public key is exposed in the frontend code, which is normal for EmailJS
- To prevent abuse, implement rate limiting and CAPTCHA if needed
- The contact form already has built-in security features:
  - CSRF protection
  - Rate limiting
  - Input sanitization
  - XSS protection
  - Honeypot field for bot detection

## Additional Configuration

For more advanced email features, you can:

1. Set up email templates with dynamic content
2. Configure auto-responders
3. Set up email forwarding rules
4. Implement email tracking

Refer to the [EmailJS documentation](https://www.emailjs.com/docs/) for more details.
