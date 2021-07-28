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

  public async destroyUserRole(userId, roleId) {
    try {
      const data = await this.ctx.model.UserRole.destroy({
        where: { userId, roleId },
      });
      if (data <= 0) throw new Error('移除角色失败');
    } catch (e) {
      throw new Error('移除角色失败');
    }
  }
}
