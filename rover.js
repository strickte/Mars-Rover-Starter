class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(messageGiven) {
    let outputObject = { message: messageGiven.name, results: [] };
    for (let i = 0; i < messageGiven.commands.length; i++) {
      if (messageGiven.commands[i].commandType === "MODE_CHANGE") {
        this.mode = messageGiven.commands[i].value;
        outputObject.results.push({ completed: true });
      } else if (messageGiven.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          outputObject.results.push({ completed: false });
        } else {
          this.position = messageGiven.commands[i].value;
          outputObject.results.push({ completed: true });
        }
      } else if (messageGiven.commands[i].commandType === "STATUS_CHECK") {
        outputObject.results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else {
        return `Invalid command input.`;
      }
    }
    return outputObject;
  }
}

module.exports = Rover;
