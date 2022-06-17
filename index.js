// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()

// //////////
// const cors = require("cors");




// var corsOptions = {
//   origin: "http://localhost:5000",
// };
// // const db = require("./src/models");
// // db.sequelize.sync();

// app.use(cors(corsOptions));

// ////////////

// // ajout de socket.io
// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static('public'))
// app.get('/', function (req, res) {
//    res.sendFile('index.html', { root: __dirname })
// })

// app.get('/json', function (req, res) {
//    res.status(200).json({"message":"ok"})
// })

// // app.get('/send-notification', function (req, res) {
// //   let body = req.body
// //   io.on('connection', (socket) =>{
// //     console.log(`Connecté au client test ${socket.id}`)
// //     // émission d'un évènement (emmetre une chaine="voici..." sur le socket nommée news)
// //     io.emit('news',body)
// //  })

// //   res.send('index.html')
// // })

// // établissement de la connexion
// //Whenever someone connects (execute when come in Web page)
// io.on('connection', (socket) =>{
//   console.log(`----------------connection-----------------------------------------------------------------`)

//    console.log(`Connecté au client ${socket.id}`)
//   io.emit('news','Voici un nouvel élément envoyé par connection',`${socket.id}`)

//    io.on('server', function(msg) {
//     console.log(`----------------server-----------------------------------------------------------------`)
  
//       console.log(`msg ${msg}`)
//       // émission d'un évènement (emmetre une chaine="voici..." sur le socket nommée news)
//       // io.emit('news','Voici un nouvel élément envoyé par le serveur')
//    })
  
//   io.on('adduser', function(name, email, uid) {
//     //name, email, and uid of user
//     console.log('New user comes in web page');
//   });
  
//      //Whenever someone disconnects (execute when Leave the web page)
//    io.on('disconnect', function () {
//     console.log('A user disconnected');
//   });
// })

// // // // établissement de la connexion

// // io.on('connection', (socket) =>{
// //   console.log(`----------------connection2-----------------------------------------------------------------`)

// //   console.log(`Connecté au client connection ${socket.id}`)
// //   // émission d'un évènement (emmetre une chaine="voici..." sur le socket nommée news)
// //   io.emit('news','Voici un nouvel élément envoyé par connection',`${socket.id}`)
// // })

// // io.on('server', function(msg) {
// //   console.log(`----------------server-----------------------------------------------------------------`)

// //     console.log(`msg ${msg}`)
// //     // émission d'un évènement (emmetre une chaine="voici..." sur le socket nommée news)
// //     // io.emit('news','Voici un nouvel élément envoyé par le serveur')
// //  })

// // io.on('adduser', function(name, email, uid) {
// //   //name, email, and uid of user
// //   console.log('New user comes in web page');
// // });

// //    //Whenever someone disconnects (execute when Leave the web page)
// //  io.on('disconnect', function () {
// //   console.log('A user disconnected');
// // });
// /////////////////////////////////////////
// //  io.on('connection', function (socket) {
// //  console.log('connected:', socket.client.id);
// //  socket.on('serverEvent', function (data) {
// //     console.log('new message from client:', data);
// //  });
// //  setInterval(function () {
// //      socket.emit('clientEvent', Math.random());
// //      console.log('message sent to the clients');
// //  }, 3000);
// //  });
// /////////////////////////////////////////
// //io.on('connection', function (socket) {
// //    console.log('connected:', socket.client.id);
// //    socket.on('serverEvent', function (data) {
//   //      console.log('new message from client:', data);
//     //});
//       //  socket.emit('clientEvent', Math.random()); // send to client
//         //console.log('message sent to the clients');
    
// //    });

// // on change app par server
// server.listen(5001, function () {
//  console.log('Votre app est disponible sur localhost:5001 !')
// })


///////////////////////////////
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5014;

app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// //////////
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5014",
};

const db = require("./src/models");
db.sequelize.sync({alter: true});

const Notification = db.notification;
const UserConnected = db.userConnected;

// const { getPagination, getPagingData } = require("../helpers/pagination");
const Op = db.Sequelize.Op;


app.use(cors(corsOptions));
var allUsers = [];
// ////////////
io.on('connection', (socket) => { //when refresh fenetre create new socket 
  console.log(`-----------------Connecté au client-----------------------------------------------------------------`)

  console.log(`Connecté au client ${socket.id}`)
  var handshakeData = socket.request;
  console.log(handshakeData.headers.referer)

  //   socket.on('notificationFromClient', function (data) {    
  //     console.log("data",data)
  //    socket.join(data);
  //  });
  // var data = socket.handshake.query.data; // => "value"
  // console.log("data,data111111",data)
  // var pa = socket.handshake.query.data; // => "value"

  // console.log("data,data",socket.handshake.query)
  // console.log("data,data",socket.handshake.params)
  // console.log("data,data",socket.handshake)
  allUsers.push({
    userId:null,
    count:0,
    socketId:socket.id
  });
  console.log("allUsers",allUsers)

  socket.on('NewUser', function(data1) {

    online = online + 1;
    console.log('Online users : ' + online);
    console.log('New user connected : ' + data1);
    Users[data1] = data1;
    console.log(Users);

  });
  console.log(`******************************************`)

  console.log(`before send userId ${socket.id}`)
  console.log(`******************************************`)

  socket.on('send userId', data => { //save userId with socketId for user whos connected
  console.log(`-----------------send userId-----------------------------------------------------------------`)

  console.log(`after send userId ${socket.id}`)
  console.log(`******************************************`)
  socket.emit( 'notificationFromClient', socket.id   ); //? why
    
    console.log("userId  from client"  ,data)
    console.log("herreeee data",{
      userId:data,
      socketId:socket.id
    })
    // if(data) {
    //   var UserConnectedJson = {
    //     userId: data,
    //     socketId: socket.id,
    //   }
    //   console.log("UserConnected created"  ,UserConnectedJson)

    //   UserConnected.create(UserConnectedJson);
    //   console.log("UserConnected created"  )
  
    // }

    // var si = allUsers.indexOf(socket);
    for(var i = 0; i < allUsers.length; i++ ){
      if(allUsers[i].socketId === socket.id){
        allUsers[i].userId = data
      }
    }
    console.log("allUsers fill",allUsers)

  })


  socket.on('notificationFromClientToAll', msg => {
  console.log(`-----------------notificationFromClientToAll-----------------------------------------------------------------`)

    console.log(`in notificationFromClientToAll `)
    ////////////////////////////////////////
    for(var i = 0; i < allUsers.length; i++ ){
      if(allUsers[i].socketId === socket.id){
        var userCount = allUsers[i].count
      }
    }
    //////////////////save notification//////////////////

      var notificationJson = {
      // userIdFrom: msg.userIdFrom,
      // userIdTo: msg.userIdTo,
      userIdFrom:msg.userIdFrom,
      socketId: msg.socketId,
      sockdddetId: msg.sockdddetId,
      topic: msg.topic,
      count:userCount,
      // date:msg.date,
      message: msg.message
  
    }
    console.log(msg)
    console.log("notificationJson",notificationJson)
    console.log("socket.id",socket.id)
  //user connected or not connected will save the notification 
    Notification.create(notificationJson);

    const infoArr = [];
    for(var i = 0; i < allUsers.length; i++ ){
      if(allUsers[i].userId !== notificationJson.userIdFrom){ 
        var count = allUsers[i].count++
        notificationJson.count = count
        infoArr.push(allUsers[i]);
        socket.broadcast.to(allUsers[i].socketId).emit( 'notification from server', notificationJson );
      }
    }
    for(var i = 0; i < infoArr.length; i++ ){
      const socketID = infoArr[i].socketId;
      Notification.findAndCountAll({
        where: { 
          [Op.and]: [{ deleted: 0 ,userIdTo: infoArr[i].userId ,read:false}] },
        attributes: { exclude: ["deleted", "deletedBy"] },
      }).then((dataNotif) => {
        var count = dataNotif.count
        socket.broadcast.to(socketID).emit( 'count notification', count);

        // socket.broadcast.emit('count notification', count);
      })
    }
    });

  // socket.broadcast.to(socket.id).emit( 'notificationFromClient', {somedata : "somedata_server"} );
  socket.on('notificationFromClient', msg => {
    console.log(`-----------------notificationFromClient-----------------------------------------------------------------`)

  console.log(`in notificationFromClient `)
  ////////////////////////////////////////
  for(var i = 0; i < allUsers.length; i++ ){
    
    if(allUsers[i].socketId === socket.id){
      var userCount = allUsers[i].count
    }
  }

//     Notification.findAndCountAll({
//     where: { 
//       [Op.and]: [{ deleted: 0 ,userIdTo: msg.userIdTo }] },
           
//     attributes: { exclude: ["deleted", "deletedBy"] },
//   }).then((data) => {
// // console.log("data.rows",data.rows)
// console.log("data.count",data.count)

//   })
  //////////////////save notification//////////////////
  if (msg.userIdFrom!=msg.userIdTo) //a user can not send a message to himself
  {  var notificationJson = {
    // userIdFrom: msg.userIdFrom,
    // userIdTo: msg.userIdTo,
    userIdFrom:msg.userIdFrom,
    userIdTo: msg.userIdTo,
    socketId: msg.socketId,
    sockdddetId: msg.sockdddetId,
    topic: msg.topic,
    count:userCount,
    // date:msg.date,
    message: msg.message

  }
  console.log(msg)
  console.log("notificationJson",notificationJson)
  console.log("socket.id",socket.id)

//user connected or not connected will save the notification 
  Notification.create(notificationJson);
  
  console.log(`Notification has been created `)
  const infoArr = [];
  for(var i = 0; i < allUsers.length; i++ ){
    if(allUsers[i].userId === notificationJson.userIdTo){ //if user is connected send a notif // send a single notification to a specific user(only one user) to multiple session(windows) //evry user has multiple socketId
      var count = allUsers[i].count++
      notificationJson.count = count
      infoArr.push(allUsers[i]);
  console.log(`in iciiiiiiiiiiiiiii `)

      socket.broadcast.to(allUsers[i].socketId).emit( 'notification from server', notificationJson );
      // socket.broadcast.to(allUsers[i].socketId).emit( 'count notification', allUsers[i].count );
      console.log(`Notification has been sent to ${allUsers[i].socketId}`)
  
  }
  }
  for(var i = 0; i < infoArr.length; i++ ){
    const socketID = infoArr[i].socketId;
    Notification.findAndCountAll({
      where: { 
        [Op.and]: [{ deleted: 0 ,userIdTo: infoArr[i].userId ,read:false}] },
      attributes: { exclude: ["deleted", "deletedBy"] },
    }).then((dataNotif) => {
      var count = dataNotif.count
      socket.broadcast.to(socketID).emit( 'count notification', count);
    })
  }

  
}


////////////////////////

////////////////////////
  /////////////////check if user connected or not /////////////////

  ///////////////if yes notificationFromClient with socket/////////////////////


//   /////////////////
//   UserConnected.findAndCountAll({
//     where: { 
//       [Op.and]: [{ deleted: 0 ,userId: msg.userIdTo }] },
           
//     attributes: { exclude: ["deleted", "deletedBy"] },
//   }).then((data) => {
// console.log("data.rows",data.rows)
// console.log("data.count",data.count)

// if(data.count){ //existe des fenetres ouvertes
//   console.log("data.socketId",data.rows[0].socketId)
//   console.log("data.socketId",data.rows[1].socketId)
//   console.log("data.socketId",data.rows[3].socketId)
//   console.log("data.socketId",data.rows[4].socketId)
//   console.log("data.socketId",data.rows[5].socketId)

//   console.log("data.socketId",data.rows[6].socketId)

//   socket.broadcast.to(data.rows[0].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[1].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[2].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[3].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[4].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[5].socketId).emit( 'get notification', {somedata : "somedata_server"} );
//   socket.broadcast.to(data.rows[6].socketId).emit( 'get notification', {somedata : "somedata_serv5555555er"} );

// }



//   })
//   /////////////////
  // io.emit('connection', (data) => {
  // console.log("data",data)

  // }
  // );
  });

  socket.on('count notificationReviever', userIdTo => { // send a total number of notification to userIdTo(the person who will receive notif)
    console.log(`count notification `)
    ////////////////////////////////////////
  console.log(`coun-t `,userIdTo)
  console.log(`--------------socket.id server `,socket.id)


    for(var i = 0; i < allUsers.length; i++ ){
      if(allUsers[i].userId === userIdTo){
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
    });


  socket.on('count notification', msg => {
  console.log(`-----------------count notification-----------------------------------------------------------------`)

    console.log(`count notification `)
    ////////////////////////////////////////
  console.log(`coun-t `,msg)

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


    });
  
    socket.on('get All notification', msg => {
    console.log(`-----------------get All notification-----------------------------------------------------------------`)

      console.log(`get All notification `)
      ////////////////////////////////////////
      console.log(`*****************************************`)

    console.log(`get All notification `,msg)
    console.log(`*************************** `)
  
      for(var i = 0; i < allUsers.length; i++ ){
        if(allUsers[i].socketId === socket.id){
          var user = allUsers[i].userId
          console.log(`user `,user)
          console.log(`socket.id `,socket.id)
          console.log(`allUsers[i].socketId `,allUsers[i].socketId)
          console.log(`allUsers[i] `,allUsers[i])
  
  
          Notification.findAndCountAll({
            where: { 
              [Op.and]: [{ deleted: 0 ,userIdTo: user }] },
                   
            attributes: { exclude: ["deleted", "deletedBy"] },
          }).then((dataNotif) => {
        console.log("dataNotif.count",dataNotif.count)
        console.log("socket.id",socket.id)
        // console.log("socket.id",dataNotif.rows)
        
        socket.emit( 'get All notification', {
          count : dataNotif.count,
          data : dataNotif.rows
        } );
  
      
          })
  
  
    
        }
      }
  
      });

      socket.on('read notification', notifId => {
      console.log(`-----------------read notification-----------------------------------------------------------------`)

        console.log(`read notification `)
        ////////////////////////////////////////
        console.log(`*****************************************`)
  
      console.log(`read notification `,notifId)
      console.log(`*************************** `)
    
        for(var i = 0; i < allUsers.length; i++ ){
          if(allUsers[i].socketId === socket.id){
            var user = allUsers[i].userId
            console.log(`user `,user)
            console.log(`socket.id `,socket.id)
            console.log(`allUsers[i].socketId `,allUsers[i].socketId)
            console.log(`allUsers[i] `,allUsers[i])
    
    
            Notification.update(
              { 
                read: true
               },
              { 
                where: { deleted: 0 ,id: notifId },
             }
            )
            .then((dataNotifUpdate) => {
              if(dataNotifUpdate == 1){
                console.log("notif updated with read:true")
          socket.emit( 'get All notification', 'has been read' );

              }else{
          socket.emit( 'get All notification', 'has not been read' );

              }
          
    
        
            })
    
    
      
          }
        }
    
        });

        socket.on('get one notification', notifId => {
        console.log(`-----------------get one notification-----------------------------------------------------------------`)

          console.log(`get one notification `)
          ////////////////////////////////////////
          console.log(`*****************************************`)
    
        console.log(`get one notification `,notifId)
        console.log(`*************************** `)
      
          for(var i = 0; i < allUsers.length; i++ ){
            if(allUsers[i].socketId === socket.id){
              var user = allUsers[i].userId
              console.log(`user `,user)
              console.log(`socket.id `,socket.id)
              console.log(`allUsers[i].socketId `,allUsers[i].socketId)
              console.log(`allUsers[i] `,allUsers[i])
      
      
              Notification.findOne(
                { 
                  where: { 
                    [Op.and]: [{ deleted: 0 ,id: notifId }] },               }
              )
              .then((dataNotif) => {            
            // socket.emit( 'get All notification', {
            //   count : dataNotif.count,
            //   data : dataNotif.rows
            // } );
      
            socket.emit( 'get one notification', dataNotif.message );
          
              })
      
      
        
            }
          }
      
          });

          
  socket.on('disconnect', function () {
    console.log("disconnected")
    socket.emit('disconnected');
    // online = online - 1;
    console.log("socket.id",socket.id)


    const allUsersArr = allUsers;
    for(var i = 0; i < allUsers.length; i++ ){
      const socketId1 = allUsersArr[i].socketId;
      const socketId2 = socket.id;

      console.log("socketId1",socketId1);
      console.log("socketId2",socketId2);
      console.log("socketId == socket.id",socketId1 === socketId2);

      if(socketId1 === socketId2){
        console.log("i",i)
        allUsers.splice(i, 1)
      }
    }
    // var i = allUsers.indexOf(socket.id);
    // console.log("i",i)
    // console.log(allUsers[i] + " just disconnected")
    // console.log(allUsers[i+1] + " just disconnected")
    // console.log(allUsers[i+2] + " just disconnected")
    // console.log(allUsers[i+3] + " just disconnected")

    // allUsers.splice(i+2, 1);
    // console.log("allUsers",allUsers)

});


});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
