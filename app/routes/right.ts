import { Application } from 'egg';

module.exports = ({ router, controller }: Application) => {
  router.resources('right', '/v1/rights', controller.right);
};
