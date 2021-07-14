import { Application } from 'egg';

module.exports = ({ router, controller, passport }: Application) => {
  router.post('/register', controller.auth.create);
  router.post('/login', controller.auth.login);

  // router.get('/github', controller.github.getLoginView);
  // router.get('/github/callback', controller.github.getAccessToken);
  const github = passport.authenticate('github', {
    successRedirect: 'http://127.0.0.1:8080/admin',
  });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);
};
