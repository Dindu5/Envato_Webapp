//var data = {
// A labels array that can contain any sort of values
//	labels: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri' ],
// Our series array that contains series objects or in this case series data arrays
//	series: [ [ 5, 2, 4, 2, 0 ] ]
//};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.

//new Chartist.Line('.ct-chart2', data);

new Chartist.Bar(
	'.ct-chart2',
	{
		labels: [ 'Nigeria', 'USA', 'China', 'Russia', 'UK', 'Australia', 'France' ],
		series: [ [ 20, 25, 28, 49, 39, 30, 42 ] ]
	},
	{
		seriesBarDistance: 10,
		reverseData: true,
		horizontalBars: true,
		axisY: {
			offset: 70
		}
	}
);

var chart = new Chartist.Pie(
	'.ct-chart',
	{
		series: [ 70, 30 ]
	},
	{
		donut: true,
		showLabel: false
	}
);

chart.on('draw', function(data) {
	if (data.type === 'slice') {
		// Get the total path length in order to use for dash array animation
		var pathLength = data.element._node.getTotalLength();

		// Set a dasharray that matches the path length as prerequisite to animate dashoffset
		data.element.attr({
			'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
		});

		// Create animation definition while also assigning an ID to the animation for later sync usage
		var animationDefinition = {
			'stroke-dashoffset': {
				id: 'anim' + data.index,
				dur: 1000,
				from: -pathLength + 'px',
				to: '0px',
				easing: Chartist.Svg.Easing.easeOutQuint,
				// We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
				fill: 'freeze'
			}
		};

		// If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
		if (data.index !== 0) {
			animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
		}

		// We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
		data.element.attr({
			'stroke-dashoffset': -pathLength + 'px'
		});

		// We can't use guided mode as the animations need to rely on setting begin manually
		// See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
		data.element.animate(animationDefinition, false);
	}
});

// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
chart.on('created', function() {
	if (window.__anim21278907124) {
		clearTimeout(window.__anim21278907124);
		window.__anim21278907124 = null;
	}
	window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
});
