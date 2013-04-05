var microee = require('microee'),
    $ = require('../shim.js'),
    Outlet = require('./outlet.js');

function CollectionView(tagName, attributes, content) {
  var self = this;
  // class to instantiate for child views
  this._childView = null;
  this.id = $.id();
  this._outlet = new Outlet(tagName, attributes, content);

  // emitted after attached to DOM
  var self = this;
  this.on('attach', function() {
    console.log(self.constructor.name+':attach', self.id);
    // bind DOM events

    // emit "attach" on children
  });
}

microee.mixin(CollectionView);

// Render returns DOM elements (or their local equivalent)
CollectionView.prototype.render = function() {
  return this._outlet.render();
};

CollectionView.prototype.bind = function(model, collection, options) {
  // instantiate a new child view, and bind the model to it
  var view = new this._childView();
  view.bind(model);
  this._outlet.add(view, options);
};

// called from the source - note that these are not for direct use;
// operations should be applied on the collection and it's models directly and never on the view itself
CollectionView.prototype.onReset = function() { };
CollectionView.prototype.onRemove = function() {

};

CollectionView.prototype.attach = function(el) {
  $(el).update(this.render());
  // also, add the DOM event listeners
};

CollectionView.mixin = function(dest) {
  var k;
  for (k in this.prototype) {
    this.prototype.hasOwnProperty(k) && (dest.prototype[k] = this.prototype[k]);
  }
};

module.exports = CollectionView;