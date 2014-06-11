$(function(){

  var time = 0;

  // assume r = 0.05;
  var r = 0.05;

  // assume g in [0.01, 0.015]
  var g = _.random(10,15)/1000;

  // assume s in [0.1-0.12]
  var s = _.random(10,12)/100;

  // initial endowment of capital
  var k = _.random(1000);

  // initial income; in U.S., currently about 4*capital
  var y = 4*k;

  // capital / income ratio
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

});
