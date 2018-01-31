mapboxgl.accessToken = 'pk.eyJ1Ijoic2JtYTQ0IiwiYSI6Inh1cm5teEEifQ.LFnEfmyK7mtxU5O64ID4ZA';
var fccData = require('./vzn_fios.json');
var active = 'December 2016';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sbma44/cjd3amkei45zc2rp6oon0rk2t',
    hash: true,
    center: [ -77.029, 38.905 ],
    zoom: 11.4
});

map.on('load', function() {
	var ctrls = document.getElementById('controls');
	Object.keys(fccData).forEach(function(k) {
		var container = document.createElement('div');

		var inpt = document.createElement('input');
		inpt.checked = k === active;
		inpt.type = 'radio';
		inpt.name = 'year-select';
		inpt.value = k;
		inpt.id = 'year-select-' + k.replace(/\s+/, '-');
		inpt.onchange = refreshFilter;
		container.appendChild(inpt);

		var label = document.createElement('label');
		label.for = inpt.id;
		label.innerText = k;
		container.appendChild(label);

		ctrls.appendChild(container);
	});

	refreshFilter();
});

function refreshFilter(e) {
	var inpts = document.getElementsByTagName('input');
	for(var i = 0; i < inpts.length; i++) {
		if (inpts[i].checked && inpts[i] !== active) {
			active = inpts[i];
			var filter = ['in', 'BLOCKID10'].concat(fccData[inpts[i].value]);
			map.setFilter('census-block-2010-fill', filter);
		}
	}
}