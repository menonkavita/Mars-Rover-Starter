class Message {
   // Write code here!
   constructor(message, commandsArr){
      this.message = message;

      if(!message){
         throw Error('Message name required.');
      }
   
      this.commands = commandsArr;
   }
}





module.exports = Message;