import baseUserRule from './baseUserRule';
import emailUserRule from './emailUserRule';
import phoneUserRule from './phoneUserRule';
import usernameUserRule from './usernameUserRule';

export default (state: 0 | 1) => ({
  username: {
    ...usernameUserRule.username,
    required: false,
  },
  email: {
    ...emailUserRule.email,
    required: false,
  },
  phone: {
    ...phoneUserRule.phone,
    required: false,
  },
  password: {
    ...baseUserRule.password,
    required: state !== 0,
  },
});
