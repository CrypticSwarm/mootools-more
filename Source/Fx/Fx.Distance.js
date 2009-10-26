/*
---

script: Fx.Distance.js

description: Defines Fx.Distance, a class that is similar to Fx.Morph except executes the transition based on mouse distance from a spot on the element.

license: MIT-style license

authors:
- Perrin Westrich

requires:
- core:1.2.4/Fx.Morph
- core:1.2.4/Element.Event
- core:1.2.4/Element.Dimensions
- /Element.Measure

provides: [Fx.Distance]

*/

Fx.Distance = new Class({

	Extends: Fx.Morph,

	options: {
		/* preComputePosition: false, */
		distance: 100,
		position: {x: 'left', y: 'top'}
	},

	initialize: function(element, options){
		this.parent(element, options);
		this.target = this.options.target || element;
		this.distanceInit();
		if(this.options.preComputePosition) this.position = this.target.getRelativeCoords(this.options.position);
		this.boundStep = this.step.bind(this);
	},

	start: function(properties){
		this.parent(properties);
		$clear(this.timer);
		this.timer = 1;
		window.addEvent('mousemove', this.boundStep);
		return this;
	},

	stop: function(){
		window.removeEvent('mousemove', this.boundStep);
	},

	distanceInit: function(){
		var dist = this.options.distance;
		if($type(dist) == 'array') {
			this.outerDist = dist[0];
			this.innerDist = dist[1] || 0;
		}
		else {
			this.outerDist = dist;
			this.innerDist = 0;
		}
	},

	step: function(e){
		var elemPos = this.position || this.target.getRelativeCoords(this.options.position),
			distance = Math.sqrt(Math.pow(e.page.x - elemPos.x, 2) + Math.pow(e.page.y - elemPos.y, 2)),
			outOfRange = (distance < this.innerDist || distance > this.outerDist);
		if(!this.active && outOfRange) return;
		this.active = !outOfRange;
		var delta = this.transition(1 - ((distance - this.innerDist) / this.outerDist).limit(0,1));
		this.set(this.compute(this.from, this.to, delta));
	}

});
