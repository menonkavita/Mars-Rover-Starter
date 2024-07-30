const Message = require("./message");
const Command = require("./command.js")


class Rover {
   // Write code here!
   /* constructor(position)
      position is a number representing the rover’s position.
      Sets this.position to position; Sets this.mode to 'NORMAL'; Sets the default value for generatorWatts to 110 */

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
         results: []                                                 // roverResults.results [] is an array of objects to store responses
      };                                                             // to command objects.

      while (i < messageObject.commands.length){
         let aCommand = messageObject.commands[i];
                  
         if (aCommand.commandType === 'MODE_CHANGE'){

            let roverProcessCommand = {                              // New Object for processing each Command object
               completed : false
            };                            

            if (this.mode === aCommand.value){
               roverProcessCommand.completed = false;                // 'MODE_CHANGE' unsuccessful, so status set to 'false'.
            } 
            else{
               this.mode = aCommand.value;
               roverProcessCommand.completed = true;                 // 'MODE_CHANGE' successful, so status set to 'true'.
            }

            roverResults.results.push(roverProcessCommand);          // Pushing status into results array.
        }
         
        if(aCommand.commandType === 'STATUS_CHECK'){
            let roverProcessCommand = {                              // Object created to process each Command object; will have 2 properties - completed, roverStatus
               completed : false
            };  

            let roverStatusProperties = {                            // Object created only when command is 'STATUS_CHECK'; Will get contain current values of 3 properties of Rover.
               mode : this.mode,
               generatorWatts : this.generatorWatts,
               position : this.position
            };

            roverProcessCommand.completed = true; 
            roverProcessCommand.roverStatus = roverStatusProperties;  
            roverResults.results.push(roverProcessCommand);          // Pushing task completed status & current rover stats into results array.
         }

         if(aCommand.commandType === 'MOVE'){                        // MOVE will work only if rover has NORMAL power. Else set status to false.
            let roverProcessCommand = {                              // New Object for processing each Command object
               completed : false
            };

            if(this.mode === 'LOW_POWER'){
               roverProcessCommand.completed = false;
            }

            if(this.mode === 'NORMAL'){
               this.position = aCommand.value;
               roverProcessCommand.completed = true;
            }
            roverResults.results.push(roverProcessCommand);
         }

         i++;
      } // end of While

      return roverResults;                                          // mesage object should contain message name & results array.
   } // end of receiveMessage()
   
} // end of Rover Class




let commands = [ new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];   // Move function
let messageObj = new Message('Test message with Two commands', commands);
let rover = new Rover(98382);                                                             // Passes 98382 as the rover's position.
let response = rover.receiveMessage(messageObj);

console.log(JSON.stringify(response, null, 2));







module.exports = Rover;
