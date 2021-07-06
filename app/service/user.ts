import { Service } from 'egg';

export default class User extends Service {

  public async createUser({ username, email, phone, password }) {
    if (username) {
      return await this.createUserByUsername(username, password);
    } else if (email) {
      return await this.createUserByEmail(email, password);
    } else if (phone) {
      return await this.createUserByPhone(phone, password);
    }
    return `hi, ${name}`;
  }

  private async findUser(options) {
    return await this.ctx.model.User.findOne({ where: options });
  }

  // 普通注册
  private async createUserByUsername(username, password) {
    password = this.ctx.helper.encryptText(password);
    const user = await this.findUser({ username });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create({ username, password });
    const result = data['dataValues'];
    delete result.password;
    return result;
  }

  // 邮箱注册
  private async createUserByEmail(email, password) {
    password = this.ctx.helper.encryptText(password);
    const user = await this.findUser({ email });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create({ email, password });
    const result = data['dataValues'];
    delete result.password;
    return result;
  }

  // 手机注册
  private async createUserByPhone(phone, password) {
    password = this.ctx.helper.encryptText(password);
    const user = await this.findUser({ phone });
    if (user) throw new Error('当前用户已存在');
    const data = await this.ctx.model.User.create({ phone, password });
    const result = data['dataValues'];
    delete result.password;
    return result;
  }
}
