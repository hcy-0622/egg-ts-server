import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.get('/v1/image_code', controller.util.imageCode);
  router.get('/v1/email_code', controller.util.emailCode);
};
