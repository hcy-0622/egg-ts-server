import { Service } from 'egg';

export default class UserService extends Service {

  public async getAll() {
    return this.ctx.model.User.findAll();
  }
}
