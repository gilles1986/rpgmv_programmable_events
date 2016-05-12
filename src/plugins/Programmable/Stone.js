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
