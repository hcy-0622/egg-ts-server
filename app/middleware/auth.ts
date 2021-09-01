const jwt = require('jsonwebtoken');

const getActionRights = (ctx: any) => {
  const userInfo = ctx.session.user;
  if (!userInfo) return null;
  const actionRights = userInfo.rightTree.find(
    (r: any) => r.rightsType === 'action',
  );
  return actionRights;
};
const isRequest = (rights: any, path: string, method: string) => {
  const regex = new RegExp(`^${rights.rightsPath}(/[0-9]*)?$`, 'i');
  if (regex.test(path) && rights.rightsMethod === method) return true;
  if (rights.children) {
    for (let i = 0; i < rights.children.length; i++) {
      const item = rights.children[i];
      if (isRequest(item, path, method)) return true;
    }
  }
  return false;
};

let actionRights;
module.exports = (_, app) => async (ctx, next) => {
  let curPath = ctx.url.toLowerCase();
  const curMethod = ctx.request.method.toLowerCase();
  if (
    curPath.startsWith('/v1/register') ||
    curPath.startsWith('/v1/login') ||
    curPath.startsWith('/v1/email_code') ||
    curPath.startsWith('/v1/image_code')
  ) {
    await next();
    return;
  }
  actionRights = getActionRights(ctx);
  if (!actionRights) {
    ctx.error(400, '没有权限');
    return;
  }

  // 参数处理
  const idx = curPath.indexOf('?');
  if (idx !== -1) curPath = curPath.substr(0, idx);

  const flag = isRequest(actionRights, curPath, curMethod);
  if (flag) {
    // const token = ctx.get('Authorization');
    const token = ctx.cookies.get('token', { signed: false });
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
    ctx.error(400, '没有权限');
  }
  // const authUrls = options.authUrls;
  // if (authUrls.includes(ctx.url)) {
  // } else {
  //   await next();
  // }
};
