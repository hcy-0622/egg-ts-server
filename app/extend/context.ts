module.exports = {
  success(data, status = 200, msg = 'Is ok!') {
    // this.status = status;
    this.body = {
      code: status,
      msg,
      data,
    };
  },
  error(status = 500, msg = 'Is fail!') {
    // this.status = status;
    this.body = {
      code: status,
      msg,
    };
  },
};
