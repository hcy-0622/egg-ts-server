const jwt = require('jsonwebtoken');

module.exports = (options, app) => async (ctx, next) => {
  const authUrls = options.authUrls;
  if (authUrls.includes(ctx.url)) {
    const token = ctx.get('Authorization');
    if (token) {
      try {
        await jwt.verify(token, app.config.keys);
        await next();
      } catch (e) {
        ctx.error(400, '没有权限');
      }
    } else {
      ctx.error(400, '没有权限');
    }
  } else {
    next();
  }
};
