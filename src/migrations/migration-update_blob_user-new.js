const { STRING } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Users',
        'image',
        {
          type: Sequelize.BLOB('long'),
          allowNull:true,
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'image',
        {type:Sequelize.STRING,allowNull:true,}
      )
    ]);
  }
};