import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.post('/v1/user_role', controller.userRole.create);
  router.post('/v1/user_role/:userId', controller.userRole.destroy);
};
