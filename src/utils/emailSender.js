import { Resend } from 'resend';

const resend = new Resend('re_dVZsGim5_4Xp4JPUmQ6bTTJuvBEnkRn2g');

export default async function emailSender(email, link) {
  try {
    const data = resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Password Recovery',
      html: `<p>Follow the link for password recovery ${link}</p>`,
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
