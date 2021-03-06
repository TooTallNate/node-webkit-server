var Node = module.exports = function(id, browser) {
  this.id      = id;
  this.browser = browser;
};

Node.prototype.get = function(name, callback) {
  this.invoke("attribute", name, function(value) {
    if (name == "checked" || name == "disabled") {
      value = (value == "true");
    }

    callback(value);
  });
};

Node.prototype.invoke = function() {
  var options = Array.prototype.slice.call(arguments),
      name    = options.shift();

  options.unshift(this.id);
  options.unshift(name);
  options.unshift("Node");

  this.browser.command.apply(this.browser, options);
};
