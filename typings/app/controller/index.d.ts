// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportUser from '../../../app/controller/user';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    user: ExportUser;
    util: ExportUtil;
  }
}
