var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var User = function(obj) {
  this.person = obj;
  this.name = "anonymous";
}

var clientDB =[];
var messageDB = {
    type:"messageHistory",
    list: []
}
var userCurrent= {
  type: "friendList",
  list: []
}

var MessageModule = function(message) {
  this.type = "";
  this.message = message;
  // this.target = "";
  this.list = "";
  this.action = "";

}

server.on("connection",function(client) {
  console.log("friend connected");

  var friend = new User(client);
  clientDB.push(friend);

  clientDB.forEach(function(user) {
    if (user.person != client) {
      var howdy= new MessageModule ("");
      howdy.type = "freshmeat";
      howdy.message = "a friend has joined the chat!";
      user.person.send(JSON.stringify(howdy));
    }
  });

  client.on("message", function(message) {
    console.log(message);
    var receivedMessage = JSON.parse(message);
    if (friend.name === "anonymous") {
      friend.name = receivedMessage;
      userCurrent.list.push(receivedMessage);

      var comeIn = new MessageModule("");
      comeIn.type= "messageHistory";
      comeIn.list= messageDB.list;
      client.send(JSON.stringify(comeIn));

      var newbies = new MessageModule("");
      newbies.type= "enter";
      newbies.list= userCurrent.list;
      clientDB.forEach(function(user){
        user.person.send(JSON.stringify(newbies));
      });
    }else {
      var msg = receivedMessage.message;
      var analyzed = sendToTheLab(msg);
      var msgStr = receivedMessage.name + ": " + receivedMessage.message;
      console.log(analyzed);
      if (analyzed.target) {
        var name = analyzed.target
        console.log(name);
        perform(analyzed);
      }else {
        messageDB.list.push(msgStr);
        clientDB.forEach(function(user) {
          user.person.send(message);
        });
      }
   }
  });


// change sent objects to message Module
  client.on("close", function() {
    var id = "";
    clientDB.forEach(function(user) {
        if(user.person === client) {
          id = user.name;
          var remove = clientDB.indexOf(user);
          clientDB.splice(remove,1);
        }
    });
    userCurrent.list.forEach(function(name) {
      if (name === id) {
        var exit = userCurrent.list.indexOf(name);
        userCurrent.list.splice(exit,1);
        console.log(userCurrent);
      }
    });
    clientDB.forEach(function(user){
      userCurrent.type = "exit";
      user.person.send(JSON.stringify(userCurrent));
      var deserter = {
        type: "goodbye",
        message: id + " has left the room."
      }
      user.person.send(JSON.stringify(deserter));
    });
  });



  var sendToTheLab = function(message) {
    console.log(message + " STTL");
      var msg = message
      var format = msg.split(" ");
      var instructions = new MessageModule (message);
      format.forEach(function(word) {
        if(word[0] === "@") {
          var index = format.indexOf(word)
          var target1 = format[index];
          var targetName = target1.substring(target1.length, 1);
          instructions.type = "OneToOne"
          instructions.target = targetName;
          format.forEach(function(word) {
            if(word[0] === "(") {
              var index1 = format.indexOf(word);
              var action1 = format[index1];
              var action = action1.substring(action1.length-1,1);
              console.log(action);
              instructions.action = action;
            }
          });
        }
      });
      return instructions;
  }

  var perform = function(obj) {
    console.log("yay");
    clientDB.forEach(function(user) {
      if (user.name === obj.target) {
        user.person.send(JSON.stringify(obj))
        console.log(user.name);
      }

    });
  }


});
