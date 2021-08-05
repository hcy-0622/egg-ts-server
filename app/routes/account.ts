import { Application } from 'egg';

module.exports = ({ router, controller, passport }: Application) => {
  router.post('/v1/register', controller.auth.create);
  router.post('/v1/login', controller.auth.login);

  // router.get('/v1/github', controller.github.getLoginView);
  // router.get('/v1/github/callback', controller.github.getAccessToken);
  const github = passport.authenticate('github', {
    successRedirect: 'http://127.0.0.1:8080/admin',
  });
  router.get('/v1/passport/github', github);
  router.get('/v1/passport/github/callback', github);
};
