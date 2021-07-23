import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  // router.get('/api/v1/roles', controller.roles.index);
  // router.post('/api/v1/roles', controller.roles.create);
  // router.delete('/api/v1/roles/:id', controller.roles.destroy);
  // router.put('/api/v1/roles/:id', controller.roles.update);
  router.resources('role', '/api/v1/roles/', controller.role);
};
