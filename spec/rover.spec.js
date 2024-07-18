const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

const commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
const message = new Message("Test message with two commands", commands);
let rover = new Rover(98382); // Passes 98382 as the rover's position.
let roverTestTwo = new Rover(98382);
let response = roverTestTwo.receiveMessage(message);
const testMoveCommands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("MOVE", 12345),
];
const testMoveMessage = new Message(
  "Test 'MOVE' command when in LOW_POWER mode",
  testMoveCommands
);
let responseTestMove = roverTestTwo.receiveMessage(testMoveMessage);
const testMoveCommandTwo = new Command("MOVE", 12345);
const testMoveMessageTwo = new Message(
  "Test 'MOVE' command",
  testMoveCommandTwo
);
let responseMoveTestTwo = new Rover(12345);

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  it("constructor sets position and default values for mode and generatorWatts", function () {
    expect(rover).toEqual({
      position: 98382,
      mode: "NORMAL",
      generatorWatts: 110,
    });
  });
  it("response returned by receiveMessage contains the name of the message", function () {
    expect(response.message).toEqual("Test message with two commands");
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    expect(response.results.length).toBe(2);
  });
  it("responds correctly to the status check command", function () {
    expect(response.results[1].roverStatus).toEqual({
      mode: "LOW_POWER",
      generatorWatts: 110,
      position: 98382,
    });
  });
  it("responds correctly to the mode change command", function () {
    expect(response.results[0].completed).toEqual(true);
    expect(roverTestTwo.mode).toEqual("LOW_POWER");
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    expect(responseTestMove.results[1].completed).toEqual(false);
  });
  it("responds with the position for the move command", function () {
    expect(responseMoveTestTwo.position).toEqual(12345);
  });
});
