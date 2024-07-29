const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  // test 7:
  /* Test 7: “constructor sets position and default values for mode and generatorWatts”. 
     Refer to the Rover Class description above for these default values. Sets this.mode to 'NORMAL'. 
     Sets the default value for generatorWatts to 110.
  */
    test("constructor sets position and default values for mode and generatorWatts", function(){
      let objRover = new Rover(2000);
      expect(objRover.position).toBe(2000);
      expect(objRover.mode).toBe('NORMAL');
      expect(objRover.generatorWatts).toBe(110);
    });


// test 8:
/* Test 8: “response returned by receiveMessage contains the name of the message”
*/
    test("response returned by receiveMessage contains the name of the message", function(){
      let objRover = new Rover(98382);
      let objCommand = new Command(new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'));
      let msgObj = new Message("My Message", objCommand);
      expect(objRover.receiveMessage(msgObj).message).toEqual("My Message");
    });

// test 9:
/* Test 9: “response returned by receiveMessage includes two results if two commands are sent in the message”
*/
test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
let objRover = new Rover(2000);
let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let msgObj = new Message("My Message", objCommand);

let roverReceiveCommandLength = objRover.receiveMessage(msgObj).results.length;
expect(roverReceiveCommandLength).toEqual(2);   
});


//test 10:
/* Test 10: “responds correctly to the status check command”
For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state 
of the rover object — mode, generatorWatts, and position. The test should check each of these for accuracy.
See the Rover Command Types table for more details.
*/
test("responds correctly to the status check command", function (){ 
  let testStatusObj = {
    mode : "NORMAL",
    generatorWatts : 110,
    position : 2000
  };

  let objRover = new Rover(2000);
  let objCommand = [new Command('STATUS_CHECK')];
  let msgObj = new Message("My Message", objCommand);
  expect(objRover.receiveMessage(msgObj).results[0].completed).toEqual(true);
  expect(objRover.receiveMessage(msgObj).results[0].roverStatus).toEqual(testStatusObj);
});


// test 11:
/* Test 11: “responds correctly to the mode change command”
The test should check the completed property and rover mode for accuracy.
The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.
*/
test("responds correctly to mode change command", function(){
  let objRover = new Rover(2000);
  let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let msgObj = new Message("My Message", objCommand);  
  expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(true);
  expect(objRover.mode).toBe('LOW_POWER')
   
  objCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
  msgObj = new Message("My Message", objCommand);
  expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(false);
  expect(objRover.mode).toBe('LOW_POWER')
});


// test 12:
/* Test 12: “responds with a false completed value when attempting to move in LOW_POWER mode”
   The test should check the completed property for accuracy and confirm that the rover’s position did not change.
    Use the Rover Modes table for guidance on how to handle move commands in different modes.
*/
test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let objRover = new Rover(2000);
  let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 9000)];
  let msgObj = new Message("My Message", objCommand);  
  expect(objRover.receiveMessage(msgObj).results[1].completed).toBe(false);   // made change
  expect(objRover.position).toBe(2000);
});


//test 13:
/* Test 13: “responds with the position for the move command”
    1. A MOVE command will update the rover’s position with the position value in the command.
*/

test('responds with the position for the move command', function(){
  let objRover = new Rover(2000);
  let objCommand = [ new Command('MOVE', 9000)];
  let msgObj = new Message("My Message", objCommand); 
  expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(true);
  expect(objRover.position).toBe(9000);
});


// end of describe ()
});
