import { Controller } from 'egg';
import AddRoleRule from '../validate/roleRule';

export default class RoleController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (ctx.query && Object.keys(ctx.query).length) {
        const roles = await ctx.service.role.getRolesList(ctx.query);
        ctx.success(roles);
      } else {
        const roles = await ctx.service.role.getAllRoles();
        ctx.success(roles);
      }
    } catch (e) {
      ctx.error(500, e.message);
    }
  }

  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(AddRoleRule, data);
      // 2.将校验通过的数据保存到数据库中
      const role = await ctx.service.role.createRole(data);
      ctx.success(role);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const role = await ctx.service.role.destroyRole(id);
      ctx.success(role);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }

  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(AddRoleRule, data);
      // 2.将校验通过的数据保存到数据库中
      const role = await ctx.service.role.updateRole(id, data);
      ctx.success(role);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
