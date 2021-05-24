export default (sequelize, DataTypes) => {
  const Recipient = sequelize.define(
    "recipient",
    {
      recipient_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      recipient_email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      recipient_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      recipient_rut: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      recipient_phone_number: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      recipient_account_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_type: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      recipient_bank: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "recipient",
      indexes: [{ unique: true, fields: ["recipient_email"] }],
    }
  );

  Recipient.associate = (models) => {
    Recipient.hasMany(models.Transfer, { as: "Transfer", foreignKey: "transfer_id" });
  };

  return Recipient;
};
