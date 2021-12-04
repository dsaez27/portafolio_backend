const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

//Configure dotenv to read .env file
require('dotenv').config();

//Body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configure CORS
app.use(cors());

//Public Directory
app.use(express.static('public'));

//Parse Json
app.use(express.json());

<<<<<<< HEAD
//Route
app.get('/api/', (req, res) => {
    res.send('Hello World');
});

=======
>>>>>>> 8238129 (cambos generales)
app.post('/api/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: '"Nodemailer Contact" < ' + process.env.EMAIL + ' >',
        to: process.env.EMAIL,
        subject: 'Tienes un nuevo mensaje de tu formulario de contacto.',
        html: '<p>'+ req.body.name + '<br>' + req.body.email + '<br>' +  req.body.message + '</p>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send('Message Sent');
    });
});

//Configure Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
