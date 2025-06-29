import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import {body, validationResult} from "express-validator";

const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
    if (error) {
        console.error(error)
    } else {
        console.log('Ready to send mail!')
    }
})


const sendNow = (mail, req, res) => {
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'error',
                msg: "Something went wrong. Please try sending your message again."
            })
        } else {
            res.json({
                status: 'success',
                msg: 'Thanks for reaching out! I’ll get back to you shortly.'
            })
        }
    })
}

export const main_contact = (req, res) => {
    const mail = {
        from: process.env.SMTP_TO_EMAIL,
        to: process.env.SMTP_TO_EMAIL,
        subject: 'New Contact Form Submission - Portfolio',
        text: `
        From: ${req.body.name} (${req.body.email})
        
        ${req.body.message}
      `,
    }
    sendNow(mail, req, res)
}

export const project_contact = (req, res) => {
    const mail = {
        from: process.env.SMTP_TO_EMAIL,
        to: process.env.SMTP_TO_EMAIL,
        subject: 'New Contact Form Submission - Portfolio (Project)',
        text: `
        From: ${req.body.name} (${req.body.email})
        Type: ${req.body.projectType + (req.body.projectType === "Similar Project" ? ": " + req.body.projectTitle : "")} 
        
        ${req.body.message}
      `,
    }
    sendNow(mail, req, res)
}

export const emailLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: { status: 'error', msg: 'Too many email requests' },
});

export const validateProjectContact = [
    body('name').trim().isLength({min:6}).withMessage('Name must be at least 6 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
    body('projectType').trim().escape(),
    body('projectTitle').optional().trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                msg: errors.array()[0].msg,
            });
        }
        next();
    }
];

export const validateMainContact = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 chars'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                msg: errors.array()[0].msg,
            });
        }
        next();
    }
];