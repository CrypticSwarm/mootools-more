
//CrypticSwarm
Fx.Distance = new Class({

	Extends: Fx.Morph,

	options: {
		distance: 100
	},

	initialize: function(element, options){
		this.parent(element, options);
		this.distanceInit();
		window.addEvent('mousemove', this.step.bind(this));
	},

	start: function(properties){
		this.parent(properties);
		$clear(this.timer);
		this.timer = 1;
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
		var elemPos = this.element.getPosition();
		var distance = Math.sqrt(Math.pow(e.page.x - elemPos.x, 2) + Math.pow(e.page.y - elemPos.y, 2));
		var delta = this.transition(1 - ((distance - this.innerDist) / this.outerDist).limit(0,1));
		this.set(this.compute(this.from, this.to, delta));
	}

});
