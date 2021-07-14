module.exports = {
  success(data, status = 200, msg = 'Is ok!') {
    this.status = status;
    this.body = {
      code: 0,
      msg,
      data,
    };
  },
  error(status = 500, msg = 'Is fail!') {
    this.status = status;
    this.body = {
      code: -1,
      msg,
    };
  },
};
