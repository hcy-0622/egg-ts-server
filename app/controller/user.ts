import { Controller } from 'egg';

export default class UserController extends Controller {
  public async getUsers() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.getAll();
      ctx.success(result);
    } catch (e) {
      ctx.error(500, e.message);
    }
  }
}
