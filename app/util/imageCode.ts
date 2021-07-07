import svgCaptcha = require('svg-captcha');

export default {
  // 生成验证码
  generateImageCode(ctx) {
    const c = svgCaptcha.create({
      size: 4,
      width: 120,
      height: 40,
      fontSize: 50,
      ignoreChars: 'OoLlIi01',
      noise: 4,
      color: true,
      background: '#EEE',
    });
    ctx.session.captcha = {
      code: c.text,
      expire: Date.now() + 300 * 1000,
    };
    console.log('验证码: ', c.text);
    return c.data;
  },
  verifyImageCode(ctx, clientCode) {
    const serverCaptcha = ctx.session.captcha;
    let serverCode;
    let serverExpire;
    try {
      serverCode = serverCaptcha.code;
      serverExpire = serverCaptcha.expire;
    } catch (e) {
      ctx.session.captcha = null;
      throw new Error('请重新获取验证码');
    }
    if (Date.now() > serverExpire) {
      ctx.session.captcha = null;
      throw new Error('验证码已经过期');
    } else if (serverCode.toUpperCase() !== clientCode.toUpperCase()) {
      ctx.session.captcha = null;
      throw new Error('验证码不正确');
    }
    ctx.session.captcha = null;
  },
};
