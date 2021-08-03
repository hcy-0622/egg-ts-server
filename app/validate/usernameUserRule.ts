import baseUserRule from './baseUserRule';
import { USERNAME_REGEX } from './regex';

export default {
  ...baseUserRule,
  username: {
    type: 'string',
    trim: true,
    format: USERNAME_REGEX,
    message: '用户名不符合要求',
  },
};
