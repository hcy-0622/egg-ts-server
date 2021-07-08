import { Controller } from 'egg';
import { User } from '../model/user';

export default class HomeController extends Controller {

  public async index() {
    const { ctx } = this;
    const data = await ctx.model.Oauth.findOne({
      where: { id: 1 },
      include: [{ model: User }],
    });
    console.log(data?.dataValues);
  }
}
