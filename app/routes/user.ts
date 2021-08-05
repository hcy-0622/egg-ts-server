import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.get('/v1/users', controller.user.getAll);
  router.post('/v1/users', controller.user.create);
  router.put('/v1/users/:id', controller.user.update);
  router.delete('/v1/users/:id', controller.user.delete);
  router.post('/v1/upload_avatar', controller.user.uploadAvatar);
  router.post('/v1/import_users', controller.user.importUsers);
  router.get('/v1/export_users', controller.user.exportUsers);
};
