const nodemailer = require('nodemailer');

let transporter;

export default {
  // 创建发送邮件对象
  createTransporterInstance(ctx) {
    if (transporter) return transporter;
    const { host, port, user, pass } = ctx.app.config.smtp;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
    return transporter;
  },
  // 创建发送内容
  createEmailInfo(ctx, to: string) {
    const code = Math.random()
      .toString(16)
      .slice(2, 6)
      .toUpperCase();
    const info = {
      from: '371447281@qq.com',
      to,
      subject: '注册验证码',
      text: code,
    };
    ctx.session.email = {
      code,
      expire: Date.now() + 60 * 1000,
    };
    return info;
  },
  async sendEmailCode(ctx, to) {
    const transporter = this.createTransporterInstance(ctx);
    const info = this.createEmailInfo(ctx, to);
    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  verifyEmailCode(ctx, clientCode) {
    const serverEmail = ctx.session.email;
    let serverCode;
    let serverExpire;
    try {
      serverCode = serverEmail.code;
      serverExpire = serverEmail.expire;
    } catch (e) {
      ctx.session.email = null;
      throw new Error('请重新获取验证码');
    }
    if (Date.now() > serverExpire) {
      ctx.session.email = null;
      throw new Error('验证码已经过期');
    } else if (serverCode !== clientCode) {
      ctx.session.email = null;
      throw new Error('验证码不正确');
    }
    ctx.session.email = null;
  },
};
