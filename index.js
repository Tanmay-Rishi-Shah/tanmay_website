const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
const PORT = 3000; // You can use any available port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server the static files
app.use(express.static(path.join( __dirname,  '/')))

app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, "index.html"))
})

app.get('/about-me', (req, resp) => {
    resp.sendFile(path.join(__dirname, "about-me.html"))
})

app.get('/my-achievements', (req, resp) => {
    resp.sendFile(path.join(__dirname, "my-achievements.html"))
})

app.get('/contact-me', (req, resp) => {
    resp.sendFile(path.join(__dirname, "contact.html"))
})

app.post('/contact-me', (req, res) => {
    const name = req.body.user_name;
    const email = req.body.user_email;
    const phone = req.body.user_phone;
    const message = req.body.user_message;

    console.log(name, email, phone, message);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tanmayrishishah@gmail.com',
            pass: 'nurl vver qwof wyhw'
        }
    });

    const mailOptions = {
        from: 'tanmayrishishah@gmail.com',
        to: ['tanmayrishishah@gmail.com','tanmayshah2012@gmail.com', 'rishi_shah03@yahoo.com', 'shahappartment@gmail.com'],
        subject: `Sent By ${name} `,
        text: `Name: ${name}\nEmail: ${email}\nPhone No : ${phone}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error while sending..", error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/contact-me')
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
