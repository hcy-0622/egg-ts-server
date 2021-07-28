import { Controller } from 'egg';

export default class UserRoleController extends Controller {
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      const role = await ctx.service.userRole.createUserRole(data);
      ctx.success(role);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }

  public async destroy() {
    const { userId } = this.ctx.params;
    const { roleId } = this.ctx.request.body;
    try {
      await this.ctx.service.userRole.destroyUserRole(userId, roleId);
      this.ctx.success();
    } catch (e) {
      this.ctx.error(400, e.message);
    }
  }
}
