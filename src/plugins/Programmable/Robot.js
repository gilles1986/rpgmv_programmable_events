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
