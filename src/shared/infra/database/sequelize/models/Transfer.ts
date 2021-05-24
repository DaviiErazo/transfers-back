export default (sequelize, DataTypes) => {
  const Transfer = sequelize.define(
    "transfer",
    {
      transfer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      recipient_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "recipient",
          key: "recipient_id",
        },
      },
      transfer_amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        min: 2,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "transfer",
    }
  );

  Transfer.associate = (models) => {
    Transfer.belongsTo(models.Recipient, {
      foreignKey: "recipient_id",
      targetKey: "recipient_id",
      as: "Recipient",
    });
  };

  return Transfer;
};
