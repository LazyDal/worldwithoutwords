var React = require('react');
var EventsView = require('./EventsView');

var WWWSite = React.createClass({
	render: function() {
		return (
			<EventsView />
		);
	}
});

React.render(
  <WWWSite />,
  document.getElementById('page')
);
