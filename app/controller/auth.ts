import { Controller } from 'egg';
import usernameUserRule from '../validate/usernameUserRule';
import emailUserRule from '../validate/emailUserRule';
import phoneUserRule from '../validate/phoneUserRule';

const enum TypeEnum {
  Username = 'username',
  Email = 'email',
  Phone = 'phone',
}

export default class AuthController extends Controller {
  public async login() {
    try {
      this.validateData();
      const data = this.ctx.request.body;
      this.ctx.helper.verifyImageCode(data.captcha);
      const result = await this.ctx.service.auth.getUserInLogging(data);
      if (!result.userState) {
        return this.ctx.error(400, '该用户不存在');
      }
      // ctx.session.user = result;
      delete result.password;
      // 生成jwt令牌
      // TODO 这里不知道是否需要 signed: false
      this.ctx.service.auth.setJwtCookie(result);
      this.ctx.success(result);
    } catch (e) {
      if (e.errors) {
        this.ctx.error(400, e.errors);
      } else {
        this.ctx.error(400, e.message);
      }
    }
  }

  public async create() {
    const data = this.ctx.request.body;
    try {
      // 校验数据
      this.validateData();
      this.validateCode();
      // 将数据保存到数据库
      const result = await this.ctx.service.auth.createUser(data);
      this.ctx.success(result);
    } catch (e) {
      if (e.errors) {
        this.ctx.body = e.errors;
        this.ctx.error(400, e.errors);
      } else {
        this.ctx.body = e.message;
        this.ctx.error(400, e.message);
      }
    }
  }

  private validateCode() {
    const data = this.ctx.request.body;
    const type = data.type;
    switch (type) {
      case TypeEnum.Username:
        this.ctx.helper.verifyImageCode(data.captcha);
        break;
      case TypeEnum.Email:
        this.ctx.helper.verifyEmailCode(data.captcha);
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
    const data = this.ctx.request.body;
    const type = data.type;
    switch (type) {
      case TypeEnum.Username:
        this.ctx.validate(usernameUserRule, data);
        break;
      case TypeEnum.Email:
        this.ctx.validate(emailUserRule, data);
        break;
      // TODO 暂未实现手机注册
      case TypeEnum.Phone:
        this.ctx.validate(phoneUserRule, data);
        throw new Error('暂未实现手机注册接口');
      // break;
      default:
        throw new Error('注册类型不存在');
    }
  }
}
