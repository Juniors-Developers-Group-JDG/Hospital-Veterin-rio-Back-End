import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'veterinariobackend@gmail.com',
    pass: 'khnnbgeapzjkbcce',
  },
  debug: true,
});

async function sendEmail(email, link) {
  try {
    const mailSent = await transporter.sendMail({
      from: 'Equipe JDG <veterinariobackend@gmail.com>',
      to: email,
      text: `Segue o link para a alteração da senha: ${link}`,
      subject: 'Alteração de senha',
    });
    return mailSent;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default sendEmail;
