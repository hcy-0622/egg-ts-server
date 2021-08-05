import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  require('./routes/code')(app);
  require('./routes/account')(app);
  require('./routes/user')(app);
  require('./routes/role')(app);

  router.post('/v1/user_role', controller.userRole.create);
  router.post('/v1/user_role/:userId', controller.userRole.destroy);
};
