/** @jsx React.DOM */
define([
  'react',
  'esri/toolbars/draw',
  'esri/geometry/geometryEngine',
  'dojo/topic',
  'dojo/on',
  'helpers/NumFormatter'
], function(
  React,
  Draw, geomEngine,
  topic, on,
  format
) {

  var fixed = format(3);

  var DrawToolWidget = React.createClass({
    getInitialState: function() {
      return {
        startPoint: null,
        btnText: 'Draw Line',
        distance: 0,
        x: 0,
        y: 0
      };
    },

    componentDidMount: function() {
      this.draw = new Draw(this.props.map);
      this.handler = this.draw.on('draw-end', this.onDrawEnd);
      this.subscriber = topic.subscribe(
        'map-mouse-move', this.mapCoordsUpdate
      );
    },

    componentWillUnMount: function() {
      this.handler.remove();
      this.subscriber.remove();
    },

    onDrawEnd: function(e) {
      this.draw.deactivate();
      this.setState({
        startPoint: null,
        btnText: 'Draw Line'
      });
    },

    mapCoordsUpdate: function(data) {
      this.setState(data);
      // not sure I like this conditional check
      if (this.state.startPoint) {
        this.updateDistance(data);
      }
    },

    updateDistance: function(endPoint) {
      var distance = geomEngine.distance(this.state.startPoint, endPoint);
      this.setState({ distance: distance });
    },

    drawLine: function() {
      this.setState({ btnText: 'Drawing...' });
      this.draw.activate(Draw.POLYLINE);
      on.once(this.props.map, 'click', function(e) {
        this.setState({ startPoint: e.mapPoint });
      }.bind(this))
    },

    render: function() {
      return (
        <div className='well'>
          <button className='btn btn-primary' onClick={this.drawLine}>
            {this.state.btnText}
          </button>
          <hr />
          <p>
            <label>Distance: {fixed(this.state.distance)}</label>
          </p>
        </div>
      );
    }
  });

  return DrawToolWidget;

});

