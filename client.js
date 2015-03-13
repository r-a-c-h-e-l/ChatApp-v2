var client = new WebSocket("ws://localhost:3000");
var counter = 0;
var counterB = 0;
var ani2;
var arrY = [];
var howManyPeaches = 4;
var peachArray = [];

var Client = function( ) {
  this.name = "";
  this.message= "";
  this.peaches = "false";
  this.rainPeaches = function() {

    for (var i = 0; i< howManyPeaches; i++) {
      var peach = new Animation();
      var rnd = Math.floor(Math.random()*(500-1))+1;
      arrY.push(rnd);
      peachArray.push(peach);
      counter++;
    }

    ani2 = setInterval(consecutivePeaches,3000);
    setTimeout(stopTheMadness, 30000)
  }
}

var person = new Client();
var greeting= "connected!";

client.addEventListener("open", function(evt) {
  console.log("you are connected!");
  introPage();
});

client.addEventListener("message", function(evt) {
  console.log(evt.data);
  var processedMessage = JSON.parse(evt.data);
  console.log(processedMessage);
  if (processedMessage.type === "enter") {
    refreshUserList(processedMessage);
  }else
    if (processedMessage.type === "exit") {
      refreshUserList(processedMessage);
  }else
    if (processedMessage.type === "freshmeat"){
      generateIntroGoodbye(processedMessage);
  }else
    if (processedMessage.type === "goodbye"){
      generateIntroGoodbye(processedMessage);
  }else
    if (processedMessage.type === "messageHistory") {
      oldChat(processedMessage);
  }else
    if (processedMessage.type === "OneToOne") {
      console.log("good work");
      var animate = processedMessage.action
      plainChat(processedMessage);
      if (animate === "rainpeaches") {
        console.log("at least you made it this far");
        person.rainPeaches()
      }
  }else {
    plainChat(processedMessage);
  }
      var chat= document.getElementById("chat");
      chat.scrollTop= chat.scrollHeight;
});









var introPage = function() {

  var body = document.querySelector("body");
  var bigDiv = document.createElement("div");
  bigDiv.id="bigDiv";
  body.style.textAlign= "center";
  body.style.position= "relative";

  var intro = document.createElement("header");
  var welcome = document.createElement("h1");
  welcome.innerText= "CHATTY";
  intro.style.backgroundColor= "rgba(75,0,130,.5)";
  intro.style.textAlign= "center";
  intro.style.color="white";
  intro.style.fontFamily="helvetica";
  intro.appendChild(welcome);

  var div1 = document.createElement("div");
  var inputName = document.createElement("input");
  inputName.id = "firstInput";
  div1.style.position="relative";
  div1.style.margin="0 auto";
  div1.style.padding="50px";
  inputName.setAttribute("type","text");
  inputName.setAttribute("placeholder","username");
  inputName.style.border="solid silver 1px";
  inputName.style.borderRadius="8px";
  inputName.style.padding="10px";
  inputName.style.fontSize="16px";
  div1.appendChild(inputName);

  var div = document.createElement("div");
  var p = document.createElement("p");
  p.innerText= "log in to enter";
  div.style.color= "rgba(75,0,130,.5)";
  div.style.fontFamily="helvetica";
  div.style.fontSize="30px";
  p.style.padding= "10px";
  div.appendChild(p);

  bigDiv.appendChild(intro);
  bigDiv.appendChild(div1);
  bigDiv.appendChild(div);

  body.appendChild(bigDiv);

  var inputName1 = document.getElementById("firstInput");
  inputName1.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 13) {
      person.name = inputName1.value;
      console.log(person);
      chatRoom();
    }
  });

}

var chatRoom = function() {

  console.log("hey!");

  client.send(JSON.stringify(person.name));

  var body = document.getElementById("the_body");

  var bigDiv = document.getElementById("bigDiv");

  body.removeChild(bigDiv);

  var bigDiv2 = document.createElement("div");
  bigDiv2.id = "bigDiv2";

  body.style.background="url(images/talkbubble.png)";
  body.style.backgroundSize="contain";
  body.style.backgroundColor="rgba(255,255,255,.5)";

  var divSidebar1 =createSideBar();
  var divInput1 =createInputArea();
  var divChat1 = createChatArea();
  //grab sideBar by id #sidebar
  bigDiv2.appendChild(divSidebar1);
  //grab divChat by id #chat
  bigDiv2.appendChild(divChat1);
  //grab divInput by id #inputArea
  bigDiv2.appendChild(divInput1);

  body.appendChild(bigDiv2);

  var input = document.getElementById("message");
  input.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 13) {
      var clientMessage = input.value;
      person.message = clientMessage;
      var miniPerson = {
        message : person.message,
        name : person.name
      }
      client.send(JSON.stringify(miniPerson));
      input.value = "";
    }
  });
}


var createSideBar = function() {
  var divSidebar = document.createElement("div");
  divSidebar.id= "sidebar";
  divSidebar.style.backgroundColor="rgba(255,250,250,.7)"
  divSidebar.style.float= "left";
  divSidebar.style.width="25%";
  divSidebar.style.height="100%";
  divSidebar.style.border="5px";
  divSidebar.style.borderRightStyle="solid";

  var empty = [];
  var uListF1 =createFriendList(empty);
  var helloGuest1 =createHelloGuest();

  divSidebar.appendChild(helloGuest1);
  divSidebar.appendChild(uListF1);
  return divSidebar;
}

var createHelloGuest = function() {
  var helloGuest = document.createElement("div");
  helloGuest.id = "helloGuest";
  var hello = document.createElement("p");
  var guest = document.createElement("p");
  hello.innerText = "HELLO ";
  guest.innerText= person.name.toUpperCase() + "!";
  hello.style.textShadow="0 0 8px darkcyan";
  guest.style.textShadow="0 0 8px darkcyan";
  helloGuest.style.textAlign="center";
  helloGuest.style.fontFamily="arial";
  helloGuest.style.fontWeight="bolder";
  helloGuest.style.fontSize="28px";
  helloGuest.style.display="inlineBlock";
  helloGuest.style.color="white";
  helloGuest.style.marginLeft= "auto";
  helloGuest.style.marginRight= "auto";
  helloGuest.style.marginTop= "5%";
  helloGuest.style.padding="10px";
  helloGuest.style.height="20%"
  helloGuest.style.width="75%";
  helloGuest.appendChild(hello);
  helloGuest.appendChild(guest);
  return helloGuest;
}

var createFriendList = function(arr) {
  var uListF = document.createElement("ul");
  uListF.id = "friendList";
  uListF.innerText="FRIENDS";
  uListF.style.textShadow="0 0 2px black";
  uListF.style.listStyle="none";
  uListF.style.fontFamily="arial";
  uListF.style.fontWeight="bold";
  uListF.style.fontSize="24px";
  uListF.style.color="white";
  uListF.style.textAlign="left";
  uListF.style.fontWeight="bold";
  uListF.style.marginTop="30px";

  arr.forEach(function(elem) {
    if(elem != person.name) {
      var li = document.createElement("li");
      li.setAttribute("class","frendz");
      li.innerText = elem;
      li.style.listStyleType="circle";
      li.style.fontSize="20px";
      li.style.padding="5px";
      li.style.color="rgba(52,213,201,.9)";
      li.style.textShadow=" 0 0 1px white";
      uListF.appendChild(li);
    }
  });
  return uListF;
}

var createChatArea = function() {
  var divChat = document.createElement("div");
  divChat.id= "chat";
  divChat.style.backgroundColor="rgba(255,250,250,.8)";
  divChat.style.overflow="auto";
  divChat.style.textAlign="left";
  divChat.style.marginLeft= "30%"
  divChat.style.border= "2px dashed silver"
  divChat.style.borderRadius="9%";
  divChat.style.height="90%";
  divChat.style.width="65%";
  var uListC1 =createChatList();
  divChat.appendChild(uListC1);
  return divChat;
}

var createChatList = function() {
  var liGreeting = document.createElement("li");
  liGreeting.id="connected";
  liGreeting.innerText= greeting;
  liGreeting.style.listStyle="none";
  var uListC = document.createElement("ul");
  uListC.id="chatList";
  uListC.style.display="block"
  uListC .appendChild(liGreeting);
  return uListC;
}

var createInputArea = function() {
  var divInput = document.createElement("div");
  divInput.id= "inputArea";
  divInput.style.position="absolute";
  divInput.style.overflow="auto";
  divInput.style.bottom="0%";
  divInput.style.marginLeft= "28%"
  divInput.style.marginRight= "10%"
  divInput.style.border="3px solid silver";
  divInput.style.height="6%";
  divInput.style.width="70%";
  var inputMessage1 =createInputMessage();
  divInput.appendChild(inputMessage1);
  return divInput;
}

var createInputMessage = function() {
  var inputMessage = document.createElement("input");
  inputMessage.id="message";
  inputMessage.setAttribute("type","text");
  inputMessage.style.color="darkblue";
  inputMessage.style.fontFamily="helvetica";
  inputMessage.style.fontSize="20px";
  inputMessage.style.height="100%";
  inputMessage.style.width="100%";
  return inputMessage;
}

var refreshUserList = function(processedMessage) {
  var serverList = processedMessage.list;
  var grabSidebar = document.getElementById("sidebar");
  var grabUserList = document.getElementById("friendList");
  grabSidebar.removeChild(grabUserList);
  var uListF2 =createFriendList(serverList);
  grabSidebar.appendChild(uListF2);
}
var generateIntroGoodbye = function (processedMessage) {
  var li = document.createElement("li");
  li.innerText= processedMessage.message;
  li.style.listStyle = "none";
  li.style.fontSize="19px";
  li.style.color= "rgba(52,213,201,.9)";
  var uL = document.getElementById("chatList");
  uL.appendChild(li);
}

var plainChat = function(processedMessage) {
  var li = document.createElement("li");
  li.innerText= processedMessage.name + ": " + processedMessage.message;
  li.style.listStyle = "none";
  li.style.fontSize="19px";
  var uL = document.getElementById("chatList");
  uL.appendChild(li);
}
var oldChat = function(processedMessage) {
  var history = processedMessage.list;
  history.forEach(function(oldMessage) {
    var li = document.createElement("li");
    li.innerText= oldMessage
    // li.innerText= oldMessage.name + ": " + oldMessage.message;
    li.style.listStyle = "none";
    li.style.fontSize= "19px";
    var uL = document.getElementById("chatList");
    uL.appendChild(li)
  });
}


//you have to move the canvas on the screen not render within the canvas
var Animation = function() {
  var ani;
  this.stop = function() {
    clearInterval(ani)
  }
  this.id = counter
  var index = this.id
  this.draw = function() {
    var num = 0;
    var increasing = true;
    var generateCanvas = function() {
      var body = document.querySelector("body");
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id","the_canvas");
      canvas.setAttribute("width","2000");
      canvas.setAttribute("height","1500");
      canvas.setAttribute("postion","absolute");

      body.appendChild(canvas);
      return canvas;
    }

    var canvas1 = generateCanvas();
    var ctx = canvas1.getContext('2d');

    var drawPrincessPeach = function(num,y) {

      var canvas1 = document.getElementById("the_canvas");
      var ctx = canvas1.getContext('2d');

      ctx.fillStyle = "white";
      //hair behind head
      ctx.beginPath();
      ctx.moveTo(135 + num,155 + y);
      ctx.lineTo(115 + num,190 + y);
      ctx.lineTo(145 + num,190 + y);
      ctx.lineTo(135 + num,190 + y);
      ctx.lineTo(115 + num,225 + y);
      ctx.lineTo(160 + num,225 + y);
      ctx.fillStyle = "#FFFF47";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(215 + num,155 + y);
      ctx.lineTo(235 + num,190 + y);
      ctx.lineTo(205 + num,190 + y);
      ctx.lineTo(215 + num,190 + y);
      ctx.lineTo(235 + num,225 + y);
      ctx.lineTo(190 + num,225 + y);
      ctx.fillStyle = "#FFFF47";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw circle head
      ctx.beginPath();
      ctx.arc(175 + num, 175 + y, 40, 0, Math.PI*2, true);
      ctx.fillStyle = "#FFDBB8";
      ctx.globalAlpha = 1;
      ctx.fill();

      //draw earring L
      var my_gradientEGemL = ctx.createLinearGradient(136 + num,182 + y,136 + num,194 + y);
      my_gradientEGemL.addColorStop(0,"#1439A7");
      my_gradientEGemL.addColorStop(.6,"#66A3FF");
      my_gradientEGemL.addColorStop(1,"#D1E3FF");
      ctx.fillStyle= my_gradientEGemL;
      ctx.beginPath();
      ctx.arc(136 + num,188 + y,6,0, Math.PI*2,true);
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw earring R
      var my_gradientEGemR = ctx.createLinearGradient(214 + num,182 + y,214 + num,194 + y);
      my_gradientEGemR.addColorStop(0,"#1439A7");
      my_gradientEGemR.addColorStop(.6,"#66A3FF");
      my_gradientEGemR.addColorStop(1,"#D1E3FF");
      ctx.fillStyle= my_gradientEGemR;
      ctx.beginPath();
      ctx.arc(214 + num,188 + y,6,0, Math.PI*2,true);
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw neck
      ctx.beginPath();
      ctx.moveTo(170 + num,155 + y);
      ctx.lineTo(160 + num,230 + y);
      ctx.lineTo(190 + num,230 + y);
      ctx.lineTo(180 + num,155 + y);
      ctx.fillStyle = "#FFDBB8";
      ctx.globalAlpha = 1;
      ctx.fill();

      //draw skirt
      ctx.beginPath();
      ctx.moveTo(160 + num,290 + y);
      ctx.quadraticCurveTo(85 + num,340 + y,95 + num,425 + y);
      ctx.quadraticCurveTo(175 + num,450 + y,255 + num,425 + y);
      ctx.quadraticCurveTo(265 + num,340 + y,190 + num,290 + y);
      ctx.fillStyle = "#FFD1F0";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw upper body counter-clockwise
      ctx.beginPath();
      ctx.moveTo(160 + num,230 + y);
      ctx.quadraticCurveTo(130 + num,230 + y,160 + num,290 + y);
      ctx.quadraticCurveTo(175 + num,310 + y,190 + num,290 + y);
      ctx.quadraticCurveTo(220 + num,230 + y,190 + num,230 + y);
      ctx.fillStyle = "#FFD1F0";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw collar
      ctx.beginPath();
      ctx.moveTo(162 + num,215 + y);
      ctx.quadraticCurveTo(175 + num,225 + y,188 + num,215 + y);
      ctx.lineTo(190 + num,230 + y);
      ctx.quadraticCurveTo(175 + num,240 + y,160 + num,230 + y);
      ctx.fillStyle = "#FFA3C2";
      ctx.globalAlpha = .7;
      ctx.fill();
      ctx.stroke();

      //draw gem
      // ctx.fillStyle = "#0000FF";
      var my_gradientGem = ctx.createLinearGradient(175 + num,237 + y,175 + num,253 + y);
      my_gradientGem.addColorStop(0,"#1439A7");
      my_gradientGem.addColorStop(.6,"#66A3FF");
      my_gradientGem.addColorStop(1,"#D1E3FF");
      ctx.fillStyle= my_gradientGem;
      ctx.beginPath();
      ctx.moveTo(175 + num,237 + y);
      ctx.quadraticCurveTo(169 + num,237 + y,169 + num,244 + y);
      ctx.quadraticCurveTo(169 + num,257 + y,175 + num,257 + y);
      ctx.quadraticCurveTo(181 + num,257 + y,181 + num,244 + y);
      ctx.quadraticCurveTo(181 + num,237 + y,175 + num,237 + y);
      // ctx.arc(175, 245, 8, 0, Math.PI*2, true);
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw bustle L
      ctx.beginPath();
      ctx.moveTo(175 + num,307 + y);
      ctx.quadraticCurveTo(170 + num,300 + y,160 + num,290 + y);
      ctx.quadraticCurveTo(123 + num,305 + y,106 + num,346 + y);
      ctx.quadraticCurveTo(165 + num,360 + y,175 + num,307 + y);
      ctx.fillStyle = "#FFA3C2";
      ctx.globalAlpha = .7;
      ctx.fill();
      ctx.stroke();

      //draw bustle R
      ctx.beginPath();
      ctx.moveTo(175 + num,307 + y);
      ctx.quadraticCurveTo(180 + num,300 + y,190 + num,290 + y);
      ctx.quadraticCurveTo(227 + num,305 + y,244 + num,346 + y);
      ctx.quadraticCurveTo(185 + num,360 + y,175 + num,307 + y);
      ctx.fillStyle = "#FFA3C2";
      ctx.globalAlpha = .7;
      ctx.fill();
      ctx.stroke();

      //draw arm L
      ctx.beginPath();
      ctx.moveTo(130 + num,250 + y);
      ctx.lineTo(115 + num,310 + y);
      ctx.lineTo(130 + num,306 + y);
      ctx.lineTo(145 + num,250 + y);
      ctx.fillStyle = "#FFDBB8";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw arm R
      ctx.beginPath();
      ctx.moveTo(220 + num,250 + y);
      ctx.lineTo(235 + num,310 + y);
      ctx.lineTo(220 + num,306 + y);
      ctx.lineTo(205 + num,250 + y);
      ctx.fillStyle = "#FFDBB8";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw glove L
      ctx.beginPath();
      ctx.moveTo(141 + num,270 + y);
      ctx.quadraticCurveTo(135 + num,270 + y,130 + num,275 + y);
      ctx.lineTo(125 + num,270 + y);
      ctx.lineTo(118 + num,298 + y);
      ctx.quadraticCurveTo(105 + num,305 + y,115 + num,320 + y);
      ctx.quadraticCurveTo(123 + num,318 + y,125 + num,310 + y);
      ctx.quadraticCurveTo(125 + num,312 + y,128 + num,315 + y);
      ctx.quadraticCurveTo(132 + num,306 + y,130 + num,304 + y);
      ctx.lineTo(141 + num,270 + y);
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //draw glove R
      ctx.beginPath();
      ctx.moveTo(209 + num,270 + y);
      ctx.quadraticCurveTo(213 + num,270 + y,218 + num,275 + y);
      ctx.lineTo(225 + num,270 + y);
      ctx.lineTo(232 + num,298 + y);
      ctx.quadraticCurveTo(245 + num,305 + y,235 + num,320 + y);
      ctx.quadraticCurveTo(227 + num,318 + y,225 + num,310 + y);
      ctx.quadraticCurveTo(225 + num,312 + y,222 + num,315 + y);
      ctx.quadraticCurveTo(218 + num,306 + y,220 + num,304 + y);
      ctx.lineTo(209 + num,270 + y);
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //circle sleeves
      ctx.beginPath();
      ctx.arc(138 + num, 240 + y, 14, 0, Math.PI*2, true);
      ctx.fillStyle = "#FFD1F0";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(212 + num, 240 + y, 14, 0, Math.PI*2, true);
      ctx.fillStyle = "#FFD1F0";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();


      //draw eyes
      ctx.beginPath();
      ctx.arc(190 + num, 170 + y, 7, 0, Math.PI*2, true);
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(160 + num, 170 + y, 7, 0, Math.PI*2, true);
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 1;
      ctx.fill();

      //draw hair
      ctx.beginPath();
      ctx.arc(175 + num, 160 + y, 50, 0, Math.PI, true);
      ctx.fillStyle = "#FFFF47";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.stroke();

      //eyelash inside L
      ctx.beginPath();
      ctx.moveTo(160 + num,170 + y);
      ctx.lineTo(150 + num,160 + y);
      ctx.lineTo(152 + num,158 + y);
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 1;
      ctx.fill();

      //eyelash outside L
      ctx.beginPath();
      ctx.moveTo(160 + num,170 + y);
      ctx.lineTo(144 + num,165 + y);
      ctx.lineTo(146 + num,163 + y);
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 1;
      ctx.fill();

      //eyelash inside R
      ctx.beginPath();
      ctx.moveTo(190 + num,170 + y);
      ctx.lineTo(200 + num,160 + y);
      ctx.lineTo(198 + num,158 + y);
      ctx.fillStyle = "#000000";
      ctx.fill();

      //eyelash outside R
      ctx.beginPath();
      ctx.moveTo(190 + num,170 + y);
      ctx.lineTo(206 + num,165 + y);
      ctx.lineTo(204 + num,163 + y);
      ctx.fillStyle = "#000000";
      ctx.fill();

      //draw mouth
      ctx.beginPath();
      ctx.arc(175 + num, 185 + y, 7, 0, Math.PI, false);
      ctx.fillStyle = "#FFB8B8";
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(168 + num,185 + y);
      ctx.quadraticCurveTo(175 + num,192 + y,182 + num,185 + y);
      ctx.fillStyle = "#000000";
      ctx.globalAplpha = .2;
      ctx.stroke();

    };

    var moveXBackForth = function() {
      var canvas = document.getElementById("the_canvas");
      if ( num >= canvas.width-258)  {
        increasing = false;
      } else if (num <= -85) {
        increasing = true;
      }
      if ( increasing === true) {
        num++;
      } else if (increasing === false){
        num--;
      }
      return num;
    };

    var animate = function() {
      ctx.clearRect(0, 0, canvas1.width, canvas1.height);
      var x = moveXBackForth();
      drawPrincessPeach(x,arrY[index]);
    }
    ani = setInterval(animate,5);
  }
}
var consecutivePeaches = function() {
  if (counterB === howManyPeaches) {
    console.log("hey")
    clearInterval(ani2);
  } else {
    peachArray[counterB].draw();
    counterB++;
  }
}
var stopTheMadness = function() {
  console.log("it is happening again(says the giant from twin peaks)")
  peachArray.forEach(function(peach) {
    peach.stop()
  })
}
