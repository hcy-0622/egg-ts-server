import { QueryInterface } from 'sequelize';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface: QueryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
    await queryInterface.addColumn('users', 'github', {
      type: INTEGER,
      allowNull: true,
      unique: false,
      defaultValue: 0, // 如果是0表示没有绑定第三方账号, 如果取值是1表示绑定了三方账号
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('users', 'github');
  },
};
