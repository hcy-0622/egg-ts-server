// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/auth';
import ExportOauth from '../../../app/service/oauth';
import ExportRight from '../../../app/service/right';
import ExportRole from '../../../app/service/role';
import ExportRoleRight from '../../../app/service/roleRight';
import ExportUser from '../../../app/service/user';
import ExportUserRole from '../../../app/service/userRole';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    oauth: AutoInstanceType<typeof ExportOauth>;
    right: AutoInstanceType<typeof ExportRight>;
    role: AutoInstanceType<typeof ExportRole>;
    roleRight: AutoInstanceType<typeof ExportRoleRight>;
    user: AutoInstanceType<typeof ExportUser>;
    userRole: AutoInstanceType<typeof ExportUserRole>;
  }
}
