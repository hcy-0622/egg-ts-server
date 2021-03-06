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
    let { role, origin, type, keyword, page, pageSize } = obj;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 5;
    keyword = keyword || '';
    const defaultCondition = {
      [Op.or]: [
        { username: { [Op.substring]: keyword } },
        { email: { [Op.substring]: keyword } },
        { phone: { [Op.substring]: keyword } },
      ],
    };
    if (keyword || role || origin || type) {
      const conditionList: any[] = [];
      if (keyword) conditionList.push(defaultCondition);
      if (role) {
        //
      }
      if (origin) conditionList.push({ [origin]: true });
      if (type) conditionList.push({ [type]: { [Op.substring]: keyword } });
      const users = await this.ctx.model.User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        include: [{ model: Role }],
        limit: pageSize,
        offset: (page - 1) * pageSize,
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
      offset: (page - 1) * pageSize,
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
      if (user) throw new Error('??????????????????');
    } else {
      delete obj.username;
    }
    if (email) {
      user = await this.ctx.model.User.findOne({ where: { email } });
      if (user) throw new Error('???????????????');
    } else {
      delete obj.email;
    }
    if (phone) {
      user = await this.ctx.model.User.findOne({ where: { phone } });
      if (user) throw new Error('??????????????????');
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
      throw new Error('??????????????????');
    } else {
      throw new Error('??????????????????');
    }
  }

  public async delete(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (user) {
      const data = await this.ctx.model.User.destroy({ where: { id } });
      if (data > 0) {
        return user;
      }
      throw new Error('??????????????????');
    } else {
      throw new Error('??????????????????');
    }
  }
}
