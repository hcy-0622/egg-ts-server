import { Controller } from 'egg';
import normalUserRule from '../validate/normalUserRule';
import emailUserRule from '../validate/emailUserRule';
import phoneUserRule from '../validate/phoneUserRule';

const jwt = require('jsonwebtoken');

const enum TypeEnum {
  Normal = 'normal',
  Email = 'email',
  Phone = 'phone'
}

export default class UserController extends Controller {
  public async login() {
    const { ctx } = this;
    try {
      this.validateData();
      const data = ctx.request.body;
      ctx.helper.verifyImageCode(data.captcha);
      const result = await ctx.service.user.getUser(data);
      // ctx.session.user = result;
      delete result.password;
      // 生成jwt令牌
      const token = jwt.sign(result, this.config.keys, { expiresIn: '7 days' });
      result.token = token;
      ctx.success(result);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async isLogin() {
    const { ctx } = this;
    const token = ctx.get('Authorization');
    try {
      const user = jwt.verify(token, this.config.keys);
      ctx.success(user);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }

  public async create() {
    const { ctx } = this;
    try {
      // 校验数据
      this.validateData();
      this.validateCode();
      // 将数据保存到数据库
      const data = await ctx.service.user.createUser(ctx.request.body);
      ctx.success(data);
    } catch (e) {
      if (e.errors) {
        ctx.body = e.errors;
        ctx.error(400, e.errors);
      } else {
        ctx.body = e.message;
        ctx.error(400, e.message);
      }
    }
  }

  private validateCode() {
    const { ctx } = this;
    const data = ctx.request.body;
    const type = data.type;
    switch (type) {
      case TypeEnum.Normal:
        ctx.helper.verifyImageCode(data.captcha);
        break;
      case TypeEnum.Email:
        ctx.helper.verifyEmailCode(data.captcha);
        break;
      // TODO 暂未实现手机注册
      case TypeEnum.Phone:
        throw new Error('暂未实现手机注册接口');
      // break;
      default:
        throw new Error('注册类型不存在');
    }
  }

  private validateData() {
    const { ctx } = this;
    const data = ctx.request.body;
    const type = data.type;
    switch (type) {
      case TypeEnum.Normal:
        ctx.validate(normalUserRule, data);
        break;
      case TypeEnum.Email:
        ctx.validate(emailUserRule, data);
        break;
      // TODO 暂未实现手机注册
      case TypeEnum.Phone:
        ctx.validate(phoneUserRule, data);
        throw new Error('暂未实现手机注册接口');
      // break;
      default:
        throw new Error('注册类型不存在');
    }
  }
}
