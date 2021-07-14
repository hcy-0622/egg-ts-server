module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BOOLEAN, STRING } = Sequelize;
    await queryInterface.addColumn('users', 'user_state', {
      type: BOOLEAN,
      allowNull: true,
      unique: false,
      defaultValue: true,
    });
    await queryInterface.addColumn('users', 'avatar_url', {
      type: STRING,
      allowNull: true,
      unique: false,
      defaultValue: '/public/avatar.png',
    });
    await queryInterface.changeColumn('users', 'github', {
      type: BOOLEAN,
      allowNull: true,
      unique: false,
      defaultValue: false,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('users', 'user_state');
    await queryInterface.removeColumn('users', 'avatar_url');
    await queryInterface.removeColumn('users', 'github');
  },
};
