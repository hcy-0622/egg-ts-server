// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportGithub from '../../../app/controller/github';
import ExportRole from '../../../app/controller/role';
import ExportUser from '../../../app/controller/user';
import ExportUserRole from '../../../app/controller/userRole';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    github: ExportGithub;
    role: ExportRole;
    user: ExportUser;
    userRole: ExportUserRole;
    util: ExportUtil;
  }
}
