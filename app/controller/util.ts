import { Controller } from 'egg';

export default class UtilController extends Controller {
  public async imageCode() {
    // 返回svg类型
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = this.ctx.helper.generateImageCode();
  }

  public async emailCode() {
    try {
      const { email } = this.ctx.query;
      const data = await this.ctx.helper.sendEmailCode(email);
      this.ctx.success(data);
    } catch (e) {
      this.ctx.error(400, e.message);
    }
  }
}
