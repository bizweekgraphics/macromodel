$(function(){

  var time = 0;
  var r = 0.05;
  var g = _.random(10,15)/1000;
  var s = _.random(10,12)/100;
  var k = _.random(1000);
  var y = 4*k;
  var β = k/y;

  function render() {
    $("#k").html(k.toFixed(2));
    $("#y").html(y.toFixed(2));
    $("#β").html(β.toFixed(2));
  }

  function update() {
    k *= 1 + r*(1-s);
    y *= 1 + g;
    β = k/y;
    render();
  }

  render();
  setInterval(update,1000);

  // Now let's overengineer it!

  var Variable = Backbone.Model.extend({
    defaults: {
      "name": "y",
      "dependence": [],
      "formula": function() { return false; }
    },
    initialize: {
      this.dependence = getParamNames(this.get("formula"));
    }
  });

  var system = new Backbone.Collection;
  system.add([

    new Variable({
      name: "r",
      formula: function() { return 0.05; }
    }),

    new Variable({
      name: "g",
      formula: function() { return _.random(10,15)/1000; }
    }),

    new Variable({
      name: "s",
      formula: function() { return _.random(10,12)/100; }
    }),

    new Variable({
      name: "k",
      formula: function() { return _.random(1000); }
    }),

    new Variable({
      name: "y",
      formula: function(k) { return 4*k; }
    }),

    new Variable({
      name: "β",
      formula: function(y,k) { return y/k; }
    })
    
  ]);

});

// from http://stackoverflow.com/a/9924463/120290
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '')
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if(result === null)
     result = []
  return result
}
