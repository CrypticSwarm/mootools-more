{
	tests: [
		{
			title: "Fx.Distance (Controller)",
			description: "Adds a distance effect to the elements on the left side. Where the target is the red div",
			verify: "When the mouse gets near the any of the corners of the controller one of the divs should activatetop left corners of the boxes do they change size?",
			before: function(){
				var controller = $('controller');
				$$('.test').each(function(elem, i){ 
					var fx = new Fx.Distance(elem, { transition: Fx.Transitions.Bounce.easeOut, target: controller, position: {x: (i%2?'left':'right'), y: (i<2?'top':'bottom')} }).start({ width: 200, 'background-color': '#ff0000'});
					elem.store('fx:dist', fx);
  			});
			}
		},
		{
			title: "Fx.Distance (top left corner)",
			description: "Adds a distance effect to the elements on the left side.",
			verify: "When the mouse gets near the top left corners of the boxes do they change size?",
			before: function(){
				$$('.test').each(function(elem){ 
    			elem.retrieve('fx:dist').stop();
    			new Fx.Distance($(elem), { transition: Fx.Transitions.Back.easeOut }).start({ width: 200, 'background-color': '#ff0000'});
  			});
			}
		}
	],
	otherScripts: ["Fx.Transitions", "Selectors"]
}
