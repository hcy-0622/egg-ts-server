import { Service } from 'egg';

const jwt = require('jsonwebtoken');

export default class AuthService extends Service {

  public setJwtCookie(userInfo) {
    const token = jwt.sign(userInfo, this.config.keys, { expiresIn: '7 days' });
    this.ctx.cookies.set('token', token, {
      path: '/',
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
      signed: false,
    });
  }

  public async getUser({ username, email, phone, password }) {
    password = this.ctx.helper.encryptText(password);
    let res;
    if (email) {
      res = await this.findUser({ email: password });
    } else if (phone) {
      res = await this.findUser({ phone, password });
    } else if (username) {
      res = await this.findUser({ username, password });
    }
    try {
      return res.dataValues;
    } catch (e) {
      throw new Error('用户名或密码不正确');
    }
  }

  public async createUser(obj) {
    const { username, email, phone, password } = obj;
    obj.password = this.ctx.helper.encryptText(password);
    if (username) {
      return await this.createUserByUsername(username, obj);
    } else if (email) {
      return await this.createUserByEmail(email, obj);
    } else if (phone) {
      return await this.createUserByPhone(phone, obj);
    }
  }

  // 普通注册
  private async createUserByUsername(username, obj) {
    const user = await this.findUser({ username });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create(obj);
    const result = data['dataValues'];
    delete result.password;
    return result;
  }

  // 邮箱注册
  private async createUserByEmail(email, obj) {
    const user = await this.findUser({ email });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create(obj);
    const result = data['dataValues'];
    delete result.password;
    return result;
  }

  // 手机注册
  private async createUserByPhone(phone, obj) {
    const user = await this.findUser({ phone });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create(obj);
    const result = data['dataValues'];
    delete result.password;
    return result;
  }

  private async findUser(options) {
    return await this.ctx.model.User.findOne({ where: options });
  }
}
