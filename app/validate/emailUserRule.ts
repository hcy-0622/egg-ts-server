import baseUserRule from './baseUserRule';
import { EMAIL_REGEX } from './regex';

export default {
  ...baseUserRule,
  email: {
    type: 'string',
    trim: true,
    format: EMAIL_REGEX,
    message: '邮箱不符合要求',
  },
};
