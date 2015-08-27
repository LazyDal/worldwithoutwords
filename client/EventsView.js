var React = require('react');
var $ = require('jquery');

var EventView = require('./EventView');

var EventsView = React.createClass({
	getInitialState: function() {
		return {eventEntries: []};
	},
	componentDidMount: function() {
		that = this;
		var getEventTried = $.ajax({
			url: '/api/getEvents',
		  dataType: 'json',
		  type: 'GET'
		});
		getEventTried.then(function(eventEntries) {
			that.setState({eventEntries: eventEntries });
			console.log(eventEntries);
		}, function(err) {
		  console.log(err);
		});
	},
	render: function() {
		var eventsViews = this.state.eventEntries.map(function(eventEntry) {
			return (<div className="eventEntry">
				 				<EventView data={eventEntry} />
							</div>);
		});
		return (<div>{eventsViews}</div>);
	}
});

module.exports = EventsView;