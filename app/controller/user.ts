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
      // 校验数据
      this.validateUserInfo();
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

  private validateUserInfo() {
    const { ctx } = this;
    const data = ctx.request.body;
    const registerType = data.registerType;
    switch (registerType) {
      case RegisterTypeEnum.Normal:
        ctx.validate(normalUserRule, data);
        ctx.helper.verifyImageCode(data.captcha);
        break;
      case RegisterTypeEnum.Email:
        ctx.validate(emailUserRule, data);
        ctx.helper.verifyEmailCode(data.captcha);
        break;
      // TODO 暂未实现手机注册
      case RegisterTypeEnum.Phone:
        ctx.validate(phoneUserRule, data);
        throw new Error('暂未实现手机注册接口');
      // break;
      default:
        throw new Error('注册类型不存在');
    }
  }
}
