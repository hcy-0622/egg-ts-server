import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize-ts',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
