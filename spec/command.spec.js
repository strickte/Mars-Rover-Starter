const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function () {
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });
});

describe("Command class", function () {
  test("constructor sets command type", function () {
    expect(new Command("MOVE")).toEqual({
      commandType: "MOVE",
    });
  });
});

describe("Command class", function () {
  test("constructor correctly sets the value property in the new object", function () {
    expect(new Command("MOVE", 12000)).toEqual({
      commandType: "MOVE",
      value: 12000,
    });
  });
});
