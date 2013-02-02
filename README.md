# jGifTools

A jQuery library for making animated gif collages. *see examples for advanced usage*

## Methods

### layers 
Useful for positioning/layering multiple gifs in a single container

	$('body').jGifTools('layers', {
		divs :  [{
			image : 'images/spiral.gif'
		},
		{
			image : 'images/bw-2.gif'
		},
		{
			image : 'images/cosby-coke.gif'
		}
		],
		width: 500,
		height : 337
		
	});

### repeater
Will repeat a single gif multiple times at random positions within a container

	$('body').jGifTools('repeater', {
		image : 'images/sea.gif',
		repeat : 1000
	});

### kscope (kaleidoscope)
Repeats, rotates, and animates a single gif

	$('#tyra')
		.jGifTools('kscope', {
			image : 'images/tyra-zombie-2.gif',
			repeat : 8,
			radius : 220,
			offset : 23
		})
		.jGifTools('kscope', {
			image : 'images/tyra-2.gif',
			repeat : 15,
			animate : {
				multiply : 4,
				spin : 0
			}
		});
