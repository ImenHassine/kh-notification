module.exports = (sequelize, Sequelize) => {
    const UserConnected = sequelize.define("UserConnected", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
      userId: { 
        type: Sequelize.UUID,
        allowNull: false,
      },
      socketId: {// user can have +sieus socketId means plusieurs fenetre est ouverte
        type: Sequelize.STRING,
        allowNull: false
      },
      updatedBy: Sequelize.UUID,
      createdBy: Sequelize.UUID,
      deletedBy: Sequelize.UUID,
      deleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  
    return UserConnected;
  };
  