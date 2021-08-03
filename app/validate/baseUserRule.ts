import { CAPTCHA_REGEX, PASSWORD_REGEX } from './regex';

export default {
  password: {
    type: 'string',
    trim: true,
    format: PASSWORD_REGEX,
    message: '密码不符合要求',
  },
  captcha: {
    type: 'string',
    trim: true,
    format: CAPTCHA_REGEX,
    message: '验证码不符合要求',
  },
  type: {
    type: 'enum',
    values: ['username', 'email', 'phone'],
  },
};
