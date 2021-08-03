import baseUserRule from './baseUserRule';
import { PHONE_REGEX } from './regex';

export default {
  ...baseUserRule,
  phone: {
    type: 'string',
    trim: true,
    format: PHONE_REGEX,
    message: '手机号不符合要求',
  },
};
