'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password:'1',
        firstName: 'John',
        lastName: 'Dai',
        address:'VN',
        gender:1,
        phoneNumber:'',
        image:'',
        roleId:'R1',
        positionId:'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async(queryInterface, Sequelize) => {
   // return queryInterface.bulkDelete('Users', null, {});
  },
};