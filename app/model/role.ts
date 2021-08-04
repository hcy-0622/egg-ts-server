import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '角色ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    field: 'role_name',
    allowNull: false,
    unique: true,
    comment: '角色姓名',
  })
  roleName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'role_desc',
    allowNull: true,
    comment: '角色描述',
  })
  roleDesc: string;

  @Column({
    field: 'role_state',
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    comment: '角色是否可用',
  })
  roleState: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => Role;
