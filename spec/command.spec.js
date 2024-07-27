const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  // test 1:
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  
  // test 2:
  /*
  Test 2 : Create a second Command test using “constructor sets command type” as the description. This test checks that 
  the constructor in the Command class correctly sets the commandType property in the new object.
  */
 test("constructor sets command type", function(){
  let objCommand = new Command("move", 500);
  expect( objCommand.commandType).toBe('move');
 });

 
 // test 3:
 /* Test 3: Code a third test using “constructor sets a value passed in as the 2nd argument” as the description. 
    This test checks that the constructor correctly sets the value property in the new object. 
    You may not need to know a proper value in order to write this test.
 */
 test("constructor sets a value passed in as the 2nd argument", function(){
  let objCommand = new Command("move", 500);
  expect( objCommand.value).toBe(500);
 });


    


});

