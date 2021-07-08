import { QueryInterface } from 'sequelize';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface: QueryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('oauths', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      access_token: {
        // 保存授权之后拿到的令牌
        type: STRING(255),
        allowNull: false,
      },
      provider: {
        // 保存是哪个平台授权的QQ/Weixin/Weibo/Github
        type: STRING(255),
        allowNull: false,
      },
      uid: {
        // 第三方平台返回的用户id
        type: INTEGER,
        allowNull: false,
        unique: true,
      },
      user_id: {
        // 本地绑定用户的id
        type: INTEGER, // varchar(255)
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        type: DATE,
      },
      updated_at: {
        type: DATE,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('oauths');
  },
};
