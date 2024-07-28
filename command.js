class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
  }


//  let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
//  let moveCommand = new Command('MOVE', 12000);
//  let statusCommand = new Command('STATUS_CHECK');

 
 module.exports = Command;