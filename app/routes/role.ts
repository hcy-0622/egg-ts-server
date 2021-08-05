import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  // router.get('/v1/roles', controller.roles.index);
  // router.post('/v1/roles', controller.roles.create);
  // router.delete('/v1/roles/:id', controller.roles.destroy);
  // router.put('/v1/roles/:id', controller.roles.update);
  router.resources('role', '/v1/roles', controller.role);
};
