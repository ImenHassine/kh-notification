module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("Notification", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userIdTo: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true
      },
      userIdFrom: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true
      },
      topic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      updatedBy: Sequelize.UUID,
      createdBy: Sequelize.UUID,
      deletedBy: Sequelize.UUID,
      deleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  
    return Notification;
  };
  