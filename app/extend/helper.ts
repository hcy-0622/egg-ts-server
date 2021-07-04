import imageCode from '../util/imageCode';
import emailCode from '../util/emailCode';
import encrypto from '../util/encrypto';

module.exports = {
  generateImageCode() {
    return imageCode.generateImageCode(this.ctx);
  },
  verifyImageCode(clientCode) {
    imageCode.verifyImageCode(this.ctx, clientCode);
  },
  async sendEmailCode(to: string) {
    return await emailCode.sendEmailCode(this.ctx, to);
  },
  verifyEmailCode(clientCode) {
    emailCode.verifyEmailCode(this.ctx, clientCode);
  },
  encryptText(text) {
    return encrypto.encryptText(this, text);
  },
};
