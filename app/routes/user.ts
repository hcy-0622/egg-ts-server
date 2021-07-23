import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.get('/api/v1/users', controller.user.getAll);
  router.post('/api/v1/users', controller.user.create);
  router.put('/api/v1/users/:id', controller.user.update);
  router.delete('/api/v1/users/:id', controller.user.delete);
  router.post('/api/v1/upload_avatar', controller.user.uploadAvatar);
  router.post('/api/v1/import_users', controller.user.importUsers);
  router.get('/api/v1/export_users', controller.user.exportUsers);
};
