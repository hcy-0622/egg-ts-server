import { v4 as uuidv4 } from 'uuid';

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    try {
      const existsUser = await ctx.service.oauth.getOAuthUser(user);
      ctx.service.auth.setJwtCookie(existsUser);
      return existsUser;
    } catch (e) {
      const userInfo = {
        username: uuidv4(),
        password: 'abc.123456',
        github: 1,
      };
      const newUser = await ctx.service.auth.createUser(userInfo);
      const oauthInfo = {
        accessToken: user.accessToken,
        provider: user.provider,
        uid: user.id,
        userId: newUser ? newUser.id : -1,
      };
      await ctx.service.oauth.createOAuth(oauthInfo);
      ctx.service.auth.setJwtCookie(newUser);
      return newUser;
    }

    // 检查用户
    // assert(user.provider, 'user.provider should exists');
    // assert(user.id, 'user.id should exists');

    // 从数据库中查找用户信息
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
    // const auth = await ctx.model.Authorization.findOne({
    //   uid: user.id,
    //   provider: user.provider,
    // });
    // const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
    // if (existsUser) {
    //   return existsUser;
    // }
    // // 调用 service 注册新用户
    // const newUser = await ctx.service.user.register(user);
    // return newUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  // app.passport.serializeUser(async (ctx, user) => {
  //   // 处理 user
  //   // ...
  //   // return user;
  // });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  // app.passport.deserializeUser(async (ctx, user) => {
  //   // 处理 user
  //   // ...
  //   // return user;
  // });
};
