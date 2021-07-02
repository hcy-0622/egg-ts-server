import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/image_code', controller.util.imageCode);
  router.get('/email_code', controller.util.emailCode);

  router.post('/register', controller.user.create);
};
