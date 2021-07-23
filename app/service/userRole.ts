import { Service } from 'egg';

export default class UserRoleService extends Service {
  public async createUserRole(obj) {
    try {
      const result = await this.ctx.model.UserRole.create(obj);
      return result.dataValues;
    } catch (e) {
      throw new Error('分配角色失败');
    }
  }
}
