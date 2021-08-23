import { Controller } from 'egg';
import rightRule from '../validate/rightRule';

export default class RightsController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (JSON.stringify(ctx.query) !== '{}') {
        const rights = await ctx.service.right.getRightsList(ctx.query);
        ctx.success(rights);
      } else {
        let rights = await ctx.service.right.getAllRights();
        rights = rights.filter((r: any) => {
          rights.forEach((r2: any) => {
            if (r.id === r2.pid) {
              r.children ? r.children.push(r2) : (r.children = [r2]);
            }
          });
          return r.level === 0;
        });
        ctx.success(rights);
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
      ctx.validate(rightRule, data);
      // 2.将校验通过的数据保存到数据库中
      const rights = await ctx.service.right.createRights(data);
      ctx.success(rights);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(rightRule, data);
      // 2.将校验通过的数据保存到数据库中
      const rights = await ctx.service.right.updateRights(id, data);
      ctx.success(rights);
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
      const rights = await ctx.service.right.destroyRights(id);
      ctx.success(rights);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
}
