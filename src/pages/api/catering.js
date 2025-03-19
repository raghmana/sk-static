import nodemailer from 'nodemailer';

// Configure nodemailer with your email service
// For production, use environment variables for sensitive information
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Admin email to receive catering requests
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sindhuskitchen.com';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      eventDate,
      eventTime,
      guestCount,
      eventType,
      venue,
      dietaryRestrictions,
      additionalInfo,
      selectedItems,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventDate || !eventTime || !guestCount || !eventType || !venue) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Format date for better readability
    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Catering Request from ${name}`,
      html: `
        <h1>New Catering Request</h1>
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h2>Event Details</h2>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${eventTime}</p>
        <p><strong>Number of Guests:</strong> ${guestCount}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        
        ${dietaryRestrictions ? `<h2>Dietary Restrictions/Preferences</h2>
        <p>${dietaryRestrictions}</p>` : ''}
        
        ${additionalInfo ? `<h2>Additional Information</h2>
        <p>${additionalInfo}</p>` : ''}
        ${selectedItems ? `<h2>Selected Breakfast menu:</h2>
            <p>${selectedItems}</p>` : ''}
      `,
      // Add text version for email clients that don't support HTML
      text: `
        New Catering Request
        
        Customer Information:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Event Details:
        Event Type: ${eventType}
        Date: ${formattedDate}
        Time: ${eventTime}
        Number of Guests: ${guestCount}
        Venue: ${venue}
        
        ${dietaryRestrictions ? `Dietary Restrictions/Preferences:
        ${dietaryRestrictions}
        
        ` : ''}
        
        ${additionalInfo ? `Additional Information:
        ${additionalInfo}` : ''}

        ${selectedItems ? `Selected Breakfast menu:
            ${selectedItems}` : ''}
      `,
    };

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Catering Request - Sindhu\'s Kitchen',
      html: `
        <h1>Thank You for Your Catering Request</h1>
        <p>Dear ${name},</p>
        <p>We have received your catering request for ${eventType} on ${formattedDate} at ${eventTime}. Our team will review your request and get back to you shortly.</p>
        
        <h2>Request Details</h2>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${eventTime}</p>
        <p><strong>Number of Guests:</strong> ${guestCount}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        
        <p>If you have any questions or need to make changes to your request, please contact us at ${ADMIN_EMAIL} or call us at (123) 456-7890.</p>
        
        <p>Thank you for choosing Sindhu's Kitchen for your event!</p>
        
        <p>Best regards,<br>
        The Sindhu's Kitchen Team</p>
      `,
      text: `
        Thank You for Your Catering Request
        
        Dear ${name},
        
        We have received your catering request for ${eventType} on ${formattedDate} at ${eventTime}. Our team will review your request and get back to you shortly.
        
        Request Details:
        Event Type: ${eventType}
        Date: ${formattedDate}
        Time: ${eventTime}
        Number of Guests: ${guestCount}
        Venue: ${venue}
        
        If you have any questions or need to make changes to your request, please contact us at ${ADMIN_EMAIL} or call us at (123) 456-7890.
        
        Thank you for choosing Sindhu's Kitchen for your event!
        
        Best regards,
        The Sindhu's Kitchen Team
      `,
    };

    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      // In development, log the emails instead of sending them
      console.log('Admin Email:', mailOptions);
      console.log('Customer Email:', customerMailOptions);
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(customerMailOptions);
      
      return res.status(200).json({ 
        message: 'Catering request received successfully (DEV MODE - emails logged to console)',
        success: true 
      });
    } else {
      // In production, send the emails
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(customerMailOptions);
      
      return res.status(200).json({ 
        message: 'Catering request received successfully',
        success: true 
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Failed to send catering request. Please try again later.',
      error: error.message 
    });
  }
}
