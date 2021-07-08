import { Service } from 'egg';
import { User } from '../model/user';

export default class OAuthService extends Service {

  public async getOAuthUser({ id, provider }) {
    const { ctx } = this;
    const data = await ctx.model.Oauth.findOne({
      where: { uid: id, provider },
      include: [{ model: User }],
    });
    try {
      return data!.dataValues.user!.dataValues;
    } catch (e) {
      throw new Error('授权用户不存在');
    }
  }

  public async createOAuth(obj) {
    const { ctx } = this;
    return await ctx.model.Oauth.create(obj);
  }
}
