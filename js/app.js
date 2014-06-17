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
    initialize: function() {
      //
    }
  });

  var system = new Backbone.Collection;
  system.add([

    new Variable({
      name: "r",
      value: false,
      dependence: [],
      formula: function() { return 0.05; }
    }),

    new Variable({
      name: "g",
      value: false,
      dependence: [],
      formula: function() { return _.random(10,15)/1000; }
    }),

    new Variable({
      name: "s",
      value: false,
      dependence: [],
      formula: function() { return _.random(10,12)/100; }
    }),

    new Variable({
      name: "k",
      value: false,
      dependence: [],
      formula: function() { return _.random(1000); }
    }),

    new Variable({
      name: "y",
      value: false,
      dependence: ["k"],
      formula: function(vars) { return 4*vars.k; }
    }),

    new Variable({
      name: "β",
      value: false,
      dependence: ["y","k"],
      formula: function(vars) { return vars.y/vars.k; }
    })

  ]);

  console.log(system);

});

/*

#TODO: OK, this'll work...

1. Every time you want to compute the state of the system, you call some function and pass in the Collection.
1a. Obliterate old values?

2. Compute the topological sort of the variables in the system.

3. Display controls for the free variables.

4. Proceed through in topological-sort-order,
4a. caching results in Variable.attributes.value,
4b. passing in vars according to dependence,
4c. finding vars with _.find on the collection by name.

5. Display the result.

Questions:
- What do cycles in toposort imply about determination?
- Should we store history, a map from the set of values of all free variables in the collection to their results, for future lookup?
- Do we just treat different models (relaxing/adding constraints) as totally different systems-collections? Probably.

*/
