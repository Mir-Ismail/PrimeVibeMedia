import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Contact form email template
export async function sendContactEmail({ name, email, company, message }) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, hsl(220, 70%, 50%), hsl(240, 80%, 60%)); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
        .field strong { color: hsl(220, 70%, 50%); }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AmazonPro</h1>
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <strong>Name:</strong> ${name}
          </div>
          <div class="field">
            <strong>Email:</strong> ${email}
          </div>
          ${company ? `<div class="field"><strong>Company:</strong> ${company}</div>` : ''}
          <div class="field">
            <strong>Message:</strong><br>
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the AmazonPro website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL || 'contact@amazonpro.com',
    subject: `New Contact Form Submission from ${name}`,
    html: htmlTemplate,
  });
}

// Auto-reply email template
export async function sendAutoReply(email, name) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Contacting AmazonPro</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, hsl(220, 70%, 50%), hsl(240, 80%, 60%)); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .cta { background: hsl(220, 70%, 50%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AmazonPro</h1>
          <h2>Thank You for Your Interest!</h2>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to AmazonPro! We've received your message and one of our Amazon growth experts will contact you within 24 hours.</p>
          <p>In the meantime, here's what you can expect from our partnership:</p>
          <ul>
            <li>✅ Free Amazon audit worth $500</li>
            <li>✅ Custom growth strategy for your business</li>
            <li>✅ AI-powered PPC optimization</li>
            <li>✅ 250%+ average ROI increase</li>
          </ul>
          <p>Ready to scale your Amazon empire? Join 500+ successful sellers who trust AmazonPro.</p>
          <a href="#" class="cta">Schedule Your Free Consultation</a>
          <p>Best regards,<br>The AmazonPro Team</p>
        </div>
        <div class="footer">
          <p>AmazonPro | contact@amazonpro.com | +1 (555) 123-4567</p>
          <p>123 Business Ave, New York, NY 10001</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Thank you for contacting AmazonPro - We\'ll be in touch soon!',
    html: htmlTemplate,
  });
}

// Newsletter welcome email template
export async function sendNewsletterWelcome(email) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to AmazonPro Newsletter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, hsl(220, 70%, 50%), hsl(240, 80%, 60%)); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .benefit { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid hsl(220, 70%, 50%); }
        .cta { background: hsl(220, 70%, 50%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AmazonPro</h1>
          <h2>Welcome to Our Newsletter!</h2>
        </div>
        <div class="content">
          <p>Welcome to the AmazonPro community!</p>
          <p>You're now part of an exclusive group of ambitious Amazon sellers who receive:</p>
          <div class="benefit">
            <strong>📊 Weekly Market Insights:</strong> Latest Amazon algorithm updates and marketplace trends
          </div>
          <div class="benefit">
            <strong>💡 Expert Tips:</strong> PPC optimization strategies that actually work
          </div>
          <div class="benefit">
            <strong>📈 Case Studies:</strong> Real success stories from our clients
          </div>
          <div class="benefit">
            <strong>🎯 Exclusive Content:</strong> Advanced tactics not shared anywhere else
          </div>
          <p>Ready to transform your Amazon business? Let's schedule a free consultation:</p>
          <a href="#" class="cta">Get Your Free Amazon Audit</a>
          <p>To your Amazon success,<br>The AmazonPro Team</p>
        </div>
        <div class="footer">
          <p>AmazonPro | contact@amazonpro.com</p>
          <p>You can unsubscribe at any time by replying to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Welcome to AmazonPro Newsletter - Your Amazon Success Journey Starts Now!',
    html: htmlTemplate,
  });
}
