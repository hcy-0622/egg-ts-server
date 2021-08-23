import { Service } from 'egg';
import { Rights } from '../model/rights';

const { Op } = require('sequelize');

export default class Role extends Service {
  public async getAllRoles() {
    const roles = await this.ctx.model.Role.findAll();
    return roles;
  }

  public async getRolesList(obj) {
    const page = parseInt(obj.page) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    const { keyword } = obj;
    if (keyword) {
      const roles = await this.ctx.model.Role.findAll({
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {
          [Op.or]: [
            { roleName: { [Op.substring]: keyword } },
            { roleDesc: { [Op.substring]: keyword } },
          ],
        },
        include: [{ model: Rights }],
      });
      const res = await this.ctx.model.Role.findAndCountAll({
        where: {
          [Op.or]: [
            { roleName: { [Op.substring]: keyword } },
            { roleDesc: { [Op.substring]: keyword } },
          ],
        },
      });
      return { list: roles, total: res.count };
    }
    const roles = await this.ctx.model.Role.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [{ model: Rights }],
    });
    const res = await this.ctx.model.Role.findAndCountAll();
    return { list: roles, total: res.count };
  }

  public async createRole(obj) {
    const data = await this.ctx.model.Role.create(obj);
    const roleData = data['dataValues'];
    return roleData;
  }

  public async destroyRole(id) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Role.destroy({
        where: { id },
      });
      if (data > 0) {
        return role;
      }
      throw new Error('删除角色失败');
    } else {
      throw new Error('删除的角色不存在');
    }
  }

  public async updateRole(id, obj) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Role.update(obj, {
        where: { id },
      });
      if (data.length > 0) {
        return role;
      }
      throw new Error('更新角色失败');
    } else {
      throw new Error('更新的角色不存在');
    }
  }
}
