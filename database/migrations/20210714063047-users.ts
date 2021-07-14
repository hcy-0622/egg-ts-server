module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BOOLEAN } = Sequelize;
    await queryInterface.addColumn('users', 'local', {
      type: BOOLEAN,
      allowNull: true,
      unique: false,
      defaultValue: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('users', 'local');
  },
};
