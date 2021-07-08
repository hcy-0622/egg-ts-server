import { Controller } from 'egg';
import { v4 as uuidv4 } from 'uuid';

const querystring = require('querystring');

export default class GithubController extends Controller {
  // 获取 Github 登录页面
  public async getLoginView() {
    const { ctx } = this;
    const baseURL = 'https://github.com/login/oauth/authorize';
    const option = {
      client_id: '9852464a3e64b8b36e88',
      scope: 'user',
    };
    const url = baseURL + '?' + querystring.stringify(option);
    ctx.redirect(url);
  }

  // 获取 Github 令牌
  public async getAccessToken() {
    const { ctx } = this;
    const { code } = ctx.query;
    const baseURL = 'https://github.com/login/oauth/access_token';
    const option = {
      client_id: '9852464a3e64b8b36e88',
      client_secret: 'eaada2d0116007346333c6573fb4d00c4ff666b2',
      code,
    };
    const result = await ctx.curl(baseURL, {
      method: 'POST',
      data: option,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const token = result.data.access_token;
    await this.getGithubUserInfo(token);
  }

  // 获取 Github 用户信息
  private async getGithubUserInfo(accessToken) {
    const { ctx } = this;
    const url = 'https://api.github.com/user';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const data = JSON.parse(result.data);
    data.provider = 'github';
    await this.go2Admin(data, accessToken);
  }

  private async go2Admin(data, accessToken) {
    const { ctx } = this;
    try {
      // 用户存在直接登录
      const user = await ctx.service.oauth.getOAuthUser(data);
      ctx.service.auth.setJwtCookie(user);
      // ctx.redirect('http://127.0.0.1:8080/admin');
    } catch (e) {
      // 用户不存在就先创建再登录
      const userInfo = {
        username: uuidv4(),
        password: 'abc.123456',
        github: 1,
      };
      const newUser = await ctx.service.auth.createUser(userInfo);
      const oauthInfo = {
        accessToken,
        provider: data.provider,
        uid: data.id,
        userId: newUser ? newUser.id : -1,
      };
      await ctx.service.oauth.createOAuth(oauthInfo);
      ctx.service.auth.setJwtCookie(newUser);
      // ctx.redirect('http://127.0.0.1:8080/admin');
    } finally {
      ctx.redirect('http://127.0.0.1:8080/admin');
    }
  }
}
