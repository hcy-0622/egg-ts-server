import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.get('/image_code', controller.util.imageCode);
  router.get('/email_code', controller.util.emailCode);
};
