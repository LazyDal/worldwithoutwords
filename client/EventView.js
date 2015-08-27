var React = require('react');

var EventView = React.createClass({
	render: function() {
		var imgPath = "/api/eventImage/" + this.props.data.data;
		return (
		<div>
			<img className="eventImage" title={this.props.data.caption} src={imgPath} />
			<div>
				<p>Date: {this.props.data.date} </p>
			</div>
		</div>
		);
	}
});

module.exports = EventView;