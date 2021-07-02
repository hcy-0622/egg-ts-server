import { Controller } from 'egg';
import normalUserRule from '../validate/normalUserRule';
import emailUserRule from '../validate/emailUserRule';
import phoneUserRule from '../validate/phoneUserRule';

const enum RegisterTypeEnum {
  Normal = 'normal',
  Email = 'email',
  Phone = 'phone'
}

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    try {
      this.validateUserInfo();
      ctx.success(null);
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

  private validateUserInfo() {
    const { ctx } = this;
    const data = ctx.request.body;
    const registerType = data.registerType;
    switch (registerType) {
      case RegisterTypeEnum.Normal:
        // 校验数据格式
        ctx.validate(normalUserRule, data);
        // 校验验证码
        ctx.helper.verifyImageCode(data.captcha);
        break;
      case RegisterTypeEnum.Email:
        ctx.validate(emailUserRule, data);
        ctx.helper.verifyEmailCode(data.captcha);
        break;
      case RegisterTypeEnum.Phone:
        ctx.validate(phoneUserRule, data);
        break;
      default:
        throw new Error('注册类型不存在');
    }
  }
}
