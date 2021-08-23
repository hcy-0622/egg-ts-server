import { Controller } from 'egg';
import AddRoleRule from '../validate/roleRule';

export default class RoleController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (ctx.query && Object.keys(ctx.query).length) {
        const result = await ctx.service.role.getRolesList(ctx.query);
        result.list.forEach((r: any) => {
          r.dataValues.rightsTree = r.dataValues.rights.filter(outItem => {
            r.dataValues.rights.forEach(inItem => {
              if (outItem.dataValues.id === inItem.dataValues.pid) {
                outItem.dataValues.children
                  ? null
                  : (outItem.dataValues.children = []);
                outItem.dataValues.children.push(inItem);
              }
            });
            return outItem.dataValues.level === 0;
          });
        });
        ctx.success(result);
      } else {
        const result = await ctx.service.role.getAllRoles();
        ctx.success(result);
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
