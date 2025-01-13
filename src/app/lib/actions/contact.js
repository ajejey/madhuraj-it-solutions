'use server';

import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Validation functions
function validateName(name) {
  if (!name || name.trim().length < 2 || name.trim().length > 50) {
    return 'Name must be between 2 and 50 characters';
  }
  return null;
}

function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !phoneRegex.test(phone)) {
    return 'Please enter a valid Indian phone number';
  }
  return null;
}

function validateEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email && !emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export async function submitContactForm(formData) {
  try {
    // Extract form data
    const name = formData.get('name')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const email = formData.get('email')?.toString().trim() || null;
    const message = formData.get('message')?.toString().trim() || null;

    // Validate inputs
    const errors = {
      name: validateName(name),
      phone: validatePhone(phone),
      email: email ? validateEmail(email) : null
    };

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some(error => error !== null);
    if (hasErrors) {
      return { 
        success: false, 
        errors: Object.entries(errors)
          .filter(([_, error]) => error !== null)
          .map(([path, message]) => ({ path, message }))
      };
    }

    // Send email to business
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.BUSINESS_EMAIL || 'bharath.rdhanraj@gmail.com',
      subject: 'New Contact Request from Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New Contact Request</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${message}</td>
            </tr>` : ''}
          </table>
          <p style="margin-top: 20px; color: #666;">
            Please follow up with the customer at your earliest convenience.
          </p>
        </div>
      `
    });

    // Optional: Send confirmation to customer
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank You for Contacting Madhuraj System Solutions',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Thank You, ${name}!</h1>
            <p>We have received your contact request. Our team will get back to you shortly.</p>
            <p>Here's a summary of the details you submitted:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666;">
              We appreciate your interest in Madhuraj System Solutions.
            </p>
          </div>
        `
      });
    }

    return { 
      success: true, 
      message: 'Your request has been submitted successfully!' 
    };
  } catch (error) {
    console.error('Contact form submission error:', error);

    return { 
      success: false, 
      message: 'Failed to submit request. Please try again later.' 
    };
  }
}
