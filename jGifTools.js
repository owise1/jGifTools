(function( $ ){
  var z_index = 0;
  var methods = {
	    repeater : function( options ) { 
			    var opts = $.extend( {
					repeat : 100,
					offsets : 10
			    }, options);

			    return this.each(function() {    
				    var $this = $(this),
						width = $(this).width(),
						height = $(this).height(),
						_images_loaded = _images = 0
						;
			

					$this.css({
						overflow : 'hidden'
					});
			
					function _init(){
						// _images_loaded++;
						// if(_images_loaded == opts.offsets){
							var img = this;
							for(var i=0; i< opts.repeat; i++){
								var div = $("<div>").css({
									width : img.width,
									height : img.height,
									background : "url('"+img.src+"')",
									position : 'absolute',
									top : (Math.random() > 0.5 ? -1 : 1) * parseInt(Math.random() * height),
									left: (Math.random() > 0.5 ? -1 : 1) * parseInt(Math.random() * width),
									zIndex : i+1
								});

								$this.append(div);

							}
						// }
					}
					if(opts.image){
						var img = new Image;
						img.onload = _init;
						img.src = opts.image;
					
						/*
						 * code to offset the images
						 *
						function _load_image(){
							var img = new Image;
							img.onload = _init;
							img.src = opts.image + '?r=' + Math.random();
							_images++;
							if(_images < opts.offsets) setTimeout(_load_image, 100);
						}
						_load_image();
						*/
					}
			    });
	    },
		layers : function( options ){
			var opts = $.extend( {
				width : false, // global width for all images
				height : false // global height for all images
		    }, options);

			return this.each(function() {    
			    var $this = $(this);
				
				$this.css('position', 'relative');
				
				var last_div;
				$.each(opts.divs, function(i, elem){
					var $w = $(window);
					var div = $("<div>").css({
						width : elem.width || opts.width || $w.width(),
						height : elem.height || opts.height || $w.height(),
						background : "url('"+elem.image+"')",
						position : 'absolute',
						'background-position' : elem.position || '0 0',
						top : elem.top || 0,
						left: elem.left || 0,
						zIndex : i+1
					});
					if(elem.size) div.css('background-size', elem.size);

					// if(last_div) last_div.append(div);
					$this.append(div);

					last_div = div;
				});
				
			});

		},
		kscope : function( options ){
			var opts = $.extend( {
				repeat : 20,
				radius : 0,
				offset : 0,
				animate : false,
				onfinish  : function(){ }
		    }, options);

			return this.each(function() {    
			    var $this          = $(this),
					width          = $(this).width(),
					height         = $(this).height(),
					_images_loaded = _images = 0,
					starting_z     = z_index,
					rand           = Math.floor(Math.random()*100000),

					// used for animation
					current_repeat  = opts.repeat,
					oringal_repeat  = opts.repeat,
					multiply_add    = true
					;
					
				z_index += opts.repeat + 5;
				if(opts.animate && opts.animate.multiply) z_index += opts.repeat * opts.animate.multiply;
		

				$this.css({
					overflow : 'hidden'
				});
				
				if(opts.image){
					var img = new Image;
					img.onload = _init;
					img.src = opts.image;
				}
				
		
				function _init(){
					var center_x = width/2, center_y = height/2, me_z = starting_z;
					for(var i=0; i< opts.repeat; i++){
						var deg = (360 / opts.repeat * (i+1)) + opts.offset;
						var radians = deg * (Math.PI / 180);
						if(opts.radius > 0) deg += 90; // if you're creting a circle, you want them facing in
						
						// remove me first - for animations
						var ze_class = 'qt-kscope-' + rand + '-' + i,
							me_sel = 'div.' + ze_class							;
						
					 	// get rid of the one above cuz we're going down
						if(!multiply_add && i+1 == opts.repeat) me_sel += $('div.' + 'qt-kscope-' + rand + '-' + (i+1)).remove();
						var $me_sel = $(me_sel);
						if($me_sel[0]){
							// me_z = $me_sel.css('zIndex');
							$me_sel.remove();
						}
						
						var div = $("<div>")
										.css({
											width : img.width,
											height : img.height,
											background : "url('"+img.src+"')",
											position : 'absolute',
											top : center_y - img.height/2 + Math.ceil(Math.sin(radians) * opts.radius),
											left: center_x - img.width/2 + Math.ceil(Math.cos(radians) * opts.radius),
											zIndex : me_z++,
											'-webkit-transform': 'rotate('+deg+'deg)',
											'-moz-transform': 'rotate('+deg+'deg)',
											'-ms-transform': 'rotate('+deg+'deg)',
											'-o-transform': 'rotate('+deg+'deg)',
											'transform': 'rotate('+deg+'deg)'
										})
										.addClass(ze_class);

						$this.append(div);

					}
					opts.onfinish();
					
					if(opts.animate){
						var animate = $.extend({
							multiply : 2,
							time : 100,
							spin : -3
						}, opts.animate);
						var max_repeats = oringal_repeat * animate.multiply;
						
						// multiply
						if(animate.multiply > 0){
							setTimeout(function(){
								if(multiply_add && current_repeat < max_repeats) current_repeat++;
								else if(multiply_add && current_repeat >= max_repeats){
									multiply_add = false;
									current_repeat--;
								}
								else if(!multiply_add && current_repeat <= oringal_repeat){
									multiply_add = true;
									current_repeat++;
								} else current_repeat--;
								
								opts.repeat = current_repeat;
								opts.offset += animate.spin;
								_init();
								
							}, animate.time);
						}
					}
				}
		    });
		}
  
	}; // end methods

  $.fn.jGifTools = function( method ) {
	if ( typeof method === 'object' || ! method ){
		method = 'repeater';
	}
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

    // } else if ( typeof method === 'object' || ! method ) {
      // return methods.init.apply( this, arguments );

    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.jGifTools' );
    }    
  
  };

})( jQuery );
