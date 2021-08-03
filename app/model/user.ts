/**
 * @desc 用户表
 */
import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { PHONE_REGEX, USERNAME_REGEX } from '../validate/regex';
import { OAuth } from './oauth';
import { Role } from './role';
import { UserRole } from './userRole';

@Table({ modelName: 'user' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '用户ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户名',
    validate: {
      is: USERNAME_REGEX,
    },
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户邮箱',
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '手机号',
    validate: {
      is: PHONE_REGEX,
    },
  })
  phone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    comment: '用户密码',
  })
  password: string;

  @Column({
    field: 'user_state',
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    comment: '用户是否可用',
  })
  userState: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    comment: '是否绑定授权账户',
  })
  github: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    defaultValue: true,
    comment: '是否本地账户',
  })
  local: boolean;

  @Column({
    field: 'avatar_url',
    type: DataType.STRING,
    allowNull: true,
    unique: false,
    comment: '用户头像',
    get() {
      const rawValue = this.getDataValue('avatarURL');
      return rawValue ? 'http://127.0.0.1:7001' + rawValue : null;
    },
  })
  avatarURL: string;

  // @Column({
  //   // 虚拟字段
  //   type: DataType.VIRTUAL,
  //   get: () => 'http://127.0.0.1:7001',
  // })
  // baseURL: string;

  @HasMany(() => OAuth)
  oauths: OAuth[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => User;
