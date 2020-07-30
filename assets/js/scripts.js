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

// bar chart
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

// pie chart
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

// pie chart animation
chart.on('draw', function(data) {
	if (data.type === 'slice') {
		var pathLength = data.element._node.getTotalLength();
		data.element.attr({
			'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
		});

		var animationDefinition = {
			'stroke-dashoffset': {
				id: 'anim' + data.index,
				dur: 1000,
				from: -pathLength + 'px',
				to: '0px',
				easing: Chartist.Svg.Easing.easeOutQuint,

				fill: 'freeze'
			}
		};

		if (data.index !== 0) {
			animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
		}

		data.element.attr({
			'stroke-dashoffset': -pathLength + 'px'
		});

		data.element.animate(animationDefinition, false);
	}
});

chart.on('created', function() {
	if (window.__anim21278907124) {
		clearTimeout(window.__anim21278907124);
		window.__anim21278907124 = null;
	}
	window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
});

// Addition of carousel on small screens
$(document).ready(function() {
	if ($(window).width() < 767) {
		var owl = $('#slide').addClass('owl-carousel');

		$('.owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			theme: 'owl-theme',
			slideSpeed: 500,
			autoplay: true,
			autoplayTimeout: 2500,
			autoplayHoverPause: true
		});
	} else {
		var owl = $('#slide').removeClass('owl-carousel');
	}
});
$(window).resize(function() {
	if ($(window).width() < 767) {
		var owl = $('#slide').addClass('owl-carousel');

		$('.owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			theme: 'owl-theme'
		});
	} else {
		var owl = $('#slide').removeClass('owl-carousel');
	}
});
