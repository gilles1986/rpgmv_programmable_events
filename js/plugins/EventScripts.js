/**
 * Created by Gilles on 12.05.2016.
 */
(function() {
  Game_Event.prototype.startScript = function() {
    var meta = $dataMap.events[this.eventId()].meta;
    if(meta.eventScript) {
      var func =window[meta.eventScript];
      var mainParameter = this;
      var additionalParameter;
      if(window.eventScriptParameters && window.eventScriptParameters[meta.eventScript]) {
        var params = window.eventScriptParameters[meta.eventScript];
        mainParameter = params.main;
        additionalParameter = params.params;
      }
      if(typeof func == "function") {
        this._mainParameter = (typeof mainParameter == "function") ? new mainParameter(this) : mainParameter;
        func.call(this,this._mainParameter, additionalParameter);
      }
    }

  };

  Game_Interpreter.prototype.getEventById = function(id) {
    return $dataMap.event(id);
  };

  Game_Interpreter.prototype.getEventByName = function(name) {

    var filtered = $dataMap.events.filter(function(elem) {
      return elem && elem.name == name;
    });
    if(filtered.length > 0) {
      return filtered[0];
    }
    return null;
  };

  Game_Interpreter.prototype.startEventScript = function(nameOrId) {
    var event = (typeof nameOrId == "string") ? this.getEventByName(nameOrId) : this.getEventById(nameOrId);
    if(event && event.id) {
      var evt = $gameMap.event(event.id);
      evt.startScript();
    }
  };
})();