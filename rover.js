const Message = require("./message");
const Command = require("./command.js")


class Rover {
   // Write code here!

   /* constructor(position)
position is a number representing the rover’s position.
Sets this.position to position
Sets this.mode to 'NORMAL'
Sets the default value for generatorWatts to 110
   */

   constructor(position){
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }


   /* receiveMessage(message)
      1. message is a Message object; 
      2. Returns an object containing at least two properties: 
         a. message: the name of the original Message object
         b. results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
      3. Updates certain properties of the rover object.
   */

   receiveMessage (messageObject){
      let i = 0;
            
      let roverResults = {
         message : messageObject.message,
         results: []                                     // roverResults.results [] is an array of objects to store responses to command objects.
      };

      while (i < messageObject.commands.length){
         let aCommand = messageObject.commands[i];
                  
         if (aCommand.commandType === 'MODE_CHANGE'){
            let roverProcessCommand = {};                            // Processing each Command object

            if (this.mode === aCommand.value){
               roverProcessCommand.completed = false;                // 'MODE_CHANGE' unsuccessful, so status set to 'false'.
            } 
            else{
               this.mode = aCommand.value;
               roverProcessCommand.completed = true;                // 'MODE_CHANGE' successful, so status set to 'true'.
            }

            roverResults.results.push(roverProcessCommand);         // Pushing status into results array.
        }
         
        if(aCommand.commandType === 'STATUS_CHECK'){
            let roverProcessCommand = {};  // Processing each Command object

            let roverStatusProperties = {   // Object made only when command is 'STATUS_CHECK'; Will get contain current values of 3 properties of Rover.
               mode : rover.mode,
               generatorWatts : rover.generatorWatts,
               position : rover.position
            };

            console.log("roverStatusProperties", roverStatusProperties);

            roverProcessCommand.completed = true; 
            roverProcessCommand.roverStatus = roverStatusProperties;     
            console.log("\nroverProcessCommand", roverProcessCommand);

            roverResults.results.push(roverProcessCommand);         // Pushing status into results array.

            console.log("\n ~~~~~ Rover Results ~~~~~", roverResults);         // Shows task completed but no currrent rover stats
            console.log("\n----- Rover Results -----", roverResults.results);  // Shows currrent rover stats
         }

         i++;
      }

      return roverResults;            // mesage object should contain message name & results array.
   }
}


let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let messageObj = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(messageObj);

console.log("\n", response);



module.exports = Rover;
