import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/image_code', controller.util.imageCode);
  router.get('/email_code', controller.util.emailCode);

  router.post('/register', controller.auth.create);
  router.post('/login', controller.auth.login);

  router.get('/users', controller.user.getUsers);

  // router.get('/github', controller.github.getLoginView);
  // router.get('/github/callback', controller.github.getAccessToken);
  const github = (app as any).passport.authenticate('github', { successRedirect: 'http://127.0.0.1:8080/admin' });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);
};
