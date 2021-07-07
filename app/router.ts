import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/image_code', controller.util.imageCode);
  router.get('/email_code', controller.util.emailCode);

  router.get('/is_login', controller.auth.isLogin);
  router.post('/register', controller.auth.create);
  router.post('/login', controller.auth.login);

  router.get('/users', controller.user.getUsers);
};
