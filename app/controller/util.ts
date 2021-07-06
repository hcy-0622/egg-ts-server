import { Controller } from 'egg';

export default class UtilController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    // 返回svg类型
    ctx.response.type = 'image/svg+xml';
    ctx.body = ctx.helper.generateImageCode();
  }

  public async emailCode() {
    const { ctx } = this;
    try {
      const { email } = ctx.query;
      const data = await ctx.helper.sendEmailCode(email);
      ctx.success(data);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
}
