import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  require('./routes/code')(app);
  require('./routes/account')(app);
  require('./routes/user')(app);
  require('./routes/role')(app);

  router.post('/api/v1/user_role', controller.userRole.create);
};
