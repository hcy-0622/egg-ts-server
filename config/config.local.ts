import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg-ts',
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
    // agent: true,
  };
  // 邮箱配置
  config.smtp = {
    host: 'smtp.qq.com',
    port: 465,
    user: '945739185@qq.com',
    pass: 'arhuduslnnthbcch',
  };
  // 禁用CSRF安全校验
  config.security = {
    csrf: {
      enable: false,
    },
  };


  return config;
};
