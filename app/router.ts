import { Application } from 'egg';

export default (app: Application) => {
  require('./routes/code')(app);
  require('./routes/account')(app);
  require('./routes/user')(app);
  require('./routes/role')(app);
  require('./routes/userRole')(app);
  require('./routes/right')(app);
  require('./routes/roleRight')(app);
};
