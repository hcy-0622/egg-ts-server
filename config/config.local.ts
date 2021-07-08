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
    timezone: '+08:00',
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
  // TODO 短信配置，暂未实现
  // config.sms = {
  //   accessKeyId: '',
  //   secretAccessKey: '',
  // };
  // 禁用CSRF安全校验
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.passportGithub = {
    key: '9852464a3e64b8b36e88',
    secret: 'eaada2d0116007346333c6573fb4d00c4ff666b2',
  };

  return config;
};
