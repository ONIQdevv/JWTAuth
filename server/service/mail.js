const send_htmlLetter = require('nodemailer');

class Mail {

    constructor() {

        this.transporter = send_htmlLetter.createTransport({

            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,

            auth: {

                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD

            }

        });
    }

    async sendActivationMail(user_letter, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            user_letter, // HTML letter structure
            subject: 'The account is active for ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <p>Follow the link to confirm your e-mail: </p>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

module.exports = new Mail();