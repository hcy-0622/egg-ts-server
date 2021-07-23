// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauth from '../../../app/model/oauth';
import ExportRole from '../../../app/model/role';
import ExportUser from '../../../app/model/user';
import ExportUserRole from '../../../app/model/userRole';

declare module 'egg' {
  interface IModel {
    Oauth: ReturnType<typeof ExportOauth>;
    Role: ReturnType<typeof ExportRole>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
