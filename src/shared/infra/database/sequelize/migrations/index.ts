import runner from "../runner";

export default {
  up: async (queryInterface, Sequelize) => {
    const CREATE_RECIPIENT = () => {
      return queryInterface.createTable("recipient", {
        recipient_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        recipient_email: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        recipient_name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        recipient_rut: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        recipient_phone_number: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        recipient_account_number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        recipient_type: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        recipient_bank: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        },
      });
    };

    const CREATE_TRANSFER = () =>
      queryInterface.createTable("transfer", {
        transfer_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        recipient_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "recipient",
            key: "recipient_id",
          },
        },
        transfer_amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
          min: 2,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        },
      });

    await runner.run([
      () => CREATE_RECIPIENT(),
      () => CREATE_TRANSFER(),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([() => queryInterface.dropTable("recipient")]);
  },
};
