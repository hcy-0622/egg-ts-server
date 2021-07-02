import imageCode from '../util/imageCode';
import emailCode from '../util/emailCode';

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
};
