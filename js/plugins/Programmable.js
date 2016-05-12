/**
 * Created by Gilles on 12.05.2016.
 */
function ProgrammableEvent(){
  this.initialize.apply(this, arguments);
}

ProgrammableEvent.help = function(helpClass) {
  console.debug("All Public Methods: "+Object.keys(helpClass.prototype).filter(function(elem) {return elem != "constructor"}));
};

ProgrammableEvent.prototype.initialize = function(evt) {
  this._event = evt;
};

ProgrammableEvent.prototype._commandList = [];

ProgrammableEvent.prototype._clear = function() {
  this._commandList = [];
};

ProgrammableEvent.prototype._command = function(commandName) {
  return {
    "code" : commandName,
    "ident" : null
  };
};
ProgrammableEvent.prototype._waitcommand = function(time) {
  return {
    "code" : 15,
    "ident" : null,
    "parameters" : [time]
  };
};

ProgrammableEvent.prototype._soundcommand = function(config) {

  if(typeof config == "string") {
    config = {"name" : config};
  }

  return {
    "code" : 44,
    "ident" : null,
    "parameters" : [
      {
        "volume" : 90,
        "pitch" : config.pitch||100,
        "name" : config.name,
        "pan" : 0
      }
    ]
  };
};

ProgrammableEvent.prototype._addCommand = function(commmandType ,commandName, times) {

  if(typeof times != "number") {
    times = 1;
  }

  var command = this._getCorrectCommand(commmandType);

  for(var i=0; i < times; i++) {
    this._commandList.push(command(commandName));
  }
};

ProgrammableEvent.prototype._getCorrectCommand = function(type) {

  switch(type) {
    case ProgrammableEvent.COMMANDTYPE.MOVE:
      return this._command;
      break;
    case ProgrammableEvent.COMMANDTYPE.SOUND:
      return this._soundcommand;
      break;
    case ProgrammableEvent.COMMANDTYPE.WAIT:
      return this._waitcommand;
      break;
  }

  return function() {};
};

ProgrammableEvent.COMMANDTYPE = {
  "MOVE" : 1,
  "SOUND" : 2,
  "WAIT" : 3
};


ProgrammableEvent.prototype._createCommands = function(list) {
  return {
    "list" : list,
    "repeat" : false,
    "skippable" : false,
    "wait" : false
  };
};



// Public API ProgrammableEvent

ProgrammableEvent.prototype.wait = function(frames) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.WAIT, frames);
  return this;
};

ProgrammableEvent.prototype.start = function() {
  this._event.setMoveRoute(this._createCommands(this._commandList));
  this._event._moveType = 3;
};

/**
 * Created by Gilles on 12.05.2016.
 */
eventScriptParameters = {
  "raetsel1" : {
    "main" : Robot,
    "params" : {}
  },
  "stein1" : {
    "main" : Stone
  }
};
function Robot() {
  this.initialize.apply(this, arguments);
  this._commandList = [];
}

Robot.prototype = Object.create(ProgrammableEvent.prototype);
Robot.prototype.constructor = Robot;

Robot.help = function() {
  ProgrammableEvent.help(Robot);
};

// Public API Robot

Robot.prototype.forward = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE,Game_Character.ROUTE_MOVE_FORWARD, times);
  return this;
};

Robot.prototype.moveForward = Robot.prototype.forward;

Robot.prototype.turnLeft = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE, Game_Character.ROUTE_TURN_90D_L, times);
  return this;
};

Robot.prototype.turnRight = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE, Game_Character.ROUTE_TURN_90D_R, times);
  return this;
};


Robot.prototype.back = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE, Game_Character.ROUTE_MOVE_BACKWARD, times);
  return this;
};

Robot.prototype.moveBack = Robot.prototype.back;

Robot.prototype.wait = function(frames) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.WAIT, frames);
  return this;
};

Robot.prototype.beep = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.SOUND, {"name" : "Decision1", "pitch" : 150}, times);
  return this;
};

Robot.prototype.buzz = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.SOUND, {"name" : "Paralyze1", "pitch" : 100}, times);
  return this;
};

/**
 * Created by Gilles on 12.05.2016.
 */
function Stone() {
  this.initialize.apply(this, arguments);
  this._commandList = [];
}

Stone.prototype = Object.create(ProgrammableEvent.prototype);
Stone.prototype.constructor = Stone;

Stone.help = function() {
  ProgrammableEvent.help(Stone);
};
// Public API Stone

Stone.prototype.forward = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE,Game_Character.ROUTE_MOVE_FORWARD, times);
  return this;
};

Stone.prototype.up = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE,Game_Character.ROUTE_MOVE_UP, times);
  return this;
};

Stone.prototype.back = function(times) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.MOVE, Game_Character.ROUTE_MOVE_BACKWARD, times);
  return this;
};

Stone.prototype.wait = function(frames) {
  this._addCommand(ProgrammableEvent.COMMANDTYPE.WAIT, frames);
  return this;
};
