import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.post('/v1/roleRights', controller.roleRight.create);
  router.delete('/v1/roleRights/:roleId', controller.roleRight.destroy);
};
