# Catering Form and Email Backend

This document provides instructions on how to set up and use the catering form and email functionality for Sindhu's Kitchen website.

## Overview

The catering feature consists of:

1. A catering page with a form to collect user details
2. An API endpoint to handle form submission
3. Email functionality to send notifications to the admin and confirmation emails to customers

## Files Created

- `src/pages/catering.js` - The catering page with the form
- `src/styles/Catering.module.scss` - Styles for the catering page
- `src/pages/api/catering.js` - API endpoint to handle form submissions and send emails
- `.env.local` - Environment variables for email configuration

## Email Configuration

To set up the email functionality, you need to configure the environment variables in the `.env.local` file:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@sindhuskitchen.com
```

### Using Gmail as the Email Service

If you're using Gmail as your email service:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app and your device
   - Click "Generate" and use the generated password in the `.env.local` file

### Using Other Email Services

If you're using a different email service, update the `EMAIL_HOST`, `EMAIL_PORT`, and `EMAIL_SECURE` variables accordingly.

## Development Mode

In development mode, emails are not actually sent but are logged to the console. This allows you to test the form without sending real emails.

To test the form in development mode:

1. Start the development server: `npm run dev`
2. Navigate to the catering page: `http://localhost:3000/catering`
3. Fill out and submit the form
4. Check the terminal for the logged email content

## Production Mode

In production mode, emails will be sent to the admin and the customer. Make sure your email configuration is correct before deploying to production.

## Customizing Email Content

You can customize the email content by modifying the `mailOptions` and `customerMailOptions` objects in the `src/pages/api/catering.js` file.

## Form Fields

The catering form collects the following information:

- Full Name (required)
- Email (required)
- Phone Number (required)
- Event Date (required)
- Event Time (required)
- Number of Guests (required)
- Event Type (required)
- Venue Address (required)
- Dietary Restrictions/Preferences (optional)
- Additional Information (optional)

## Troubleshooting

If you encounter issues with sending emails:

1. Check that your email credentials are correct in the `.env.local` file
2. Ensure that your email service allows sending emails from your application
3. If using Gmail, make sure you're using an App Password and not your regular password
4. Check the server logs for any error messages

## Security Considerations

- The `.env.local` file contains sensitive information and should not be committed to version control
- Consider using a more secure email service for production
- Implement rate limiting to prevent abuse of the form
