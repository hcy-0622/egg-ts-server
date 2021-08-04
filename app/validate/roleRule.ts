export default {
  roleName: {
    type: 'string',
    trim: true,
    min: 2,
  },
  roleDesc: {
    required: false,
    type: 'string',
    trim: true,
  },
};
