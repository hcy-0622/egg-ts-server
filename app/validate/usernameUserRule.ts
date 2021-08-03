export default {
  username: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9_-]{4,16}$/,
    message: '用户名不符合要求',
  },
  password: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9_]{4,16}$/,
    message: '密码不符合要求',
  },
  captcha: {
    type: 'string',
    trim: true,
    // 必须是数字字母符号组合
    format: /^[A-Za-z0-9]{4}$/,
    message: '验证码不符合要求',
  },
  type: {
    type: 'enum',
    values: ['username', 'email', 'phone'],
  },
};
