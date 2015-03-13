# ChatApp-v2

This is a websocket chap application that exists in the browser.
For the Chat Application to be run 'npm install' must be run in the terminal once the repository has been cloned.

This chat applcation is dependent on the 'ws' package.

  * this version of the chat app retains all the features of chatty,    with the added feature of animation.
  * a user can @ an individual whose name shows up in their 'friendlist' and a whisper will be sent to them.
  * In addition, a user can use the special command (rainpeaches) to initialize an animation on the screen of their friend whom they whispered to.

~ FIXES: need to adjust the z index of the animation so that it appears above the other elements. Also need to wipe the screen clean of the canvas drawing when it is complete.
