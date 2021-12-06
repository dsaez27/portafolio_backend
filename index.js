const express = require('express');
const app = express();
const cors = require('cors');

const sgMail = require('@sendgrid/mail');

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

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg2 = {
        to: 'dssh27@gmail.com',
        from: 'dssh26@outlook.com',
        subject:
            'Hey Dany, recibimos un nuevo envío de formulario de contacto!',
        html: `<p><b>Nombre:</b> ${name}</p> <p><b>Email:</b> ${email}</p><p><b>Mensaje:</b><br><br><i>${message}</i></p>`,
    };

    sgMail
        .send(msg2)
        .then((res) => res.json())
        .catch((err) => res.send(err));
});

//Configure Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
