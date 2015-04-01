/** @jsx React.DOM */
define([
  'react',
  'dojo/query',
  'dojo/dom',
  'dojo/dom-construct',
  './components/Locator',
  './components/DrawTools'
], function(
  React,
  query, dom, domConstruct,
  Locator, DrawTools
) {

  var createContainer = function() {
    var c = query('.widget-container');
    if (c.length) {
      return c.shift();
    }

    var container = domConstruct.create('div', {
      className: 'widget-container'
    }, dom.byId('map_root'), 'first');
    return container;
  };

  var addContainer = function(map) {
    React.render(
      <div>
        <Locator map={map} />
        <DrawTools map={map} />
      </div>,
      createContainer());
  };

  return {
    addContainer: addContainer
  };

});

