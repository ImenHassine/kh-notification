const db = require("../models");
const Notification = db.notification;
const Op = db.Sequelize.Op;

exports.getNumberOfNotification = (socket, allUsers) => {
    for(var i = 0; i < allUsers.length; i++ ){
        if(allUsers[i].socketId === socket.id){
          var user = allUsers[i].userId
          console.log(`user `,user)
          console.log(`socket.id `,socket.id)
          console.log(`allUsers[i].socketId `,allUsers[i].socketId)
          console.log(`allUsers[i] `,allUsers[i])
  
  
          Notification.findAndCountAll({
            where: { 
              [Op.and]: [{ deleted: 0 ,userIdTo: user ,read:false}] },
                   
            attributes: { exclude: ["deleted", "deletedBy"] },
          }).then((dataNotif) => {
        console.log("dataNotif.count",dataNotif.count)
        console.log("socket.id",socket.id)
        var count = dataNotif.count
        // allUsers[i].count = dataNotif.count 
        socket.emit( 'count notification', count);
      
          })
        }
      }
}; 