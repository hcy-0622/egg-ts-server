import { Service } from 'egg';
import { Role } from '../model/role';

const { Op } = require('sequelize');

export default class UserService extends Service {
  public async getAll() {
    return this.ctx.model.User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  }

  public async getList(obj) {
    let { role, origin, type, key, currentPage, pageSize } = obj;
    currentPage = parseInt(currentPage) || 1;
    pageSize = parseInt(pageSize) || 5;
    const defaultCondition = {
      [Op.or]: [
        { username: { [Op.substring]: key } },
        { email: { [Op.substring]: key } },
        { phone: { [Op.substring]: key } },
      ],
    };
    if (key || role || origin || type) {
      const conditionList: any[] = [];
      if (key) conditionList.push(defaultCondition);
      if (role) {
        //
      }
      if (origin) conditionList.push({ [origin]: true });
      if (type) conditionList.push({ [type]: { [Op.substring]: key } });
      const users = await this.ctx.model.User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        include: [{ model: Role }],
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const result = await this.ctx.model.User.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { list: users, total: result.count };
    }
    const users = await this.ctx.model.User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [{ model: Role }],
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const result = await this.ctx.model.User.findAndCountAll();
    return { list: users, total: result.count };
  }

  public async create(obj) {
    const { username, password, email, phone } = obj;
    obj.password = this.ctx.helper.encryptText(password);
    let user;
    if (username) {
      user = await this.ctx.model.User.findOne({ where: { username } });
      if (user) throw new Error('用户名已存在');
    } else {
      delete obj.username;
    }
    if (email) {
      user = await this.ctx.model.User.findOne({ where: { email } });
      if (user) throw new Error('邮箱已存在');
    } else {
      delete obj.email;
    }
    if (phone) {
      user = await this.ctx.model.User.findOne({ where: { phone } });
      if (user) throw new Error('手机号已存在');
    } else {
      delete obj.phone;
    }
    const result = await this.ctx.model.User.create(obj);
    const resultData = result.dataValues;
    delete resultData.password;
    return resultData;
  }

  public async update(id, obj) {
    const user = await this.ctx.model.User.findByPk(id);
    if (user) {
      obj.username ? null : delete obj.username;
      obj.password
        ? (obj.password = this.ctx.helper.encryptText(obj.password))
        : delete obj.password;
      obj.email ? null : delete obj.email;
      obj.phone ? null : delete obj.phone;
      const result = await this.ctx.model.User.update(obj, { where: { id } });
      console.log('result --------------', result);
      if (result.length > 0) {
        return result;
      }
      throw new Error('更新用户失败');
    } else {
      throw new Error('该用户不存在');
    }
  }

  public async delete(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (user) {
      const data = await this.ctx.model.User.destroy({ where: { id } });
      if (data > 0) {
        return user;
      }
      throw new Error('删除用户失败');
    } else {
      throw new Error('该用户不存在');
    }
  }
}
