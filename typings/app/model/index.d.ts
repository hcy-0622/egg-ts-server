// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauth from '../../../app/model/oauth';
import ExportRights from '../../../app/model/rights';
import ExportRole from '../../../app/model/role';
import ExportRoleRights from '../../../app/model/roleRights';
import ExportUser from '../../../app/model/user';
import ExportUserRole from '../../../app/model/userRole';

declare module 'egg' {
  interface IModel {
    Oauth: ReturnType<typeof ExportOauth>;
    Rights: ReturnType<typeof ExportRights>;
    Role: ReturnType<typeof ExportRole>;
    RoleRights: ReturnType<typeof ExportRoleRights>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
