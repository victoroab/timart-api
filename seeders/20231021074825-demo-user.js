'use strict'
const Fakerator = require('fakerator')
let fakerator = Fakerator()

const USER_COUNT = 1000

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      for (let i = 0; i < USER_COUNT; i++) {
        await queryInterface.bulkInsert(
          'Users',
          [
            {
              firstName: fakerator.names.firstName(),
              lastName: fakerator.names.lastName(),
              email: fakerator.internet.email(),
            },
          ],
          { transaction }
        )
      }
      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
      throw e
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Orders', null, {})
  },
}
