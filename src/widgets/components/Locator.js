/** @jsx React.DOM */
define([
  'react',
  'dojo/topic',
  'helpers/NumFormatter'
], function(
  React,
  topic,
  format
) {

  var fixed = format(3);

  var LocatorWidget = React.createClass({
    getInitialState: function() {
      return {
        x: 0,
        y: 0
      };
    },

    componentDidMount: function() {
      this.handler = this.props.map.on('mouse-move', function(e) {
        this.update(e.mapPoint);
      }.bind(this));
    },

    componentWillUnMount: function() {
      this.handler.remove();
    },

    update: function(data) {
      this.setState(data);
      topic.publish('map-mouse-move', data);
    },

    render: function() {
      return (
        <div className='well'>
          <label>x: {fixed(this.state.x)}</label>
          <br/>
          <label>y: {fixed(this.state.y)}</label>
        </div>
      );
    }
  });

  return LocatorWidget;

});
