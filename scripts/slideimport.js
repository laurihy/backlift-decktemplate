/*

When page is ready, load slides from /slides,render them and use $.deck to initialize

*/

$(function() {

	var container = $('.deck-container');

	var renderSlides = function(slides){
		var sorted = _.sortBy(slides, function(slide) {
		var number = slide.file.match(/\d+/);
			return parseInt(number || "0");
		});

		_.each(sorted, function(slide){
			container.append(slide.data)
		});

		// once slides are appended, kick in necessary scripts

		$.deck('.slide');

		prettyPrint();

		$('.stripes tr:odd').addClass('odd');

		// if not linked to specific slide, add first hash
		if(window.location.hash==''){
			window.location.hash = '#'+$('.slide').first().attr('id');
		}
  	}

  	// load all files from slides-folder
	$.get("/backlift/toc/slides/*", function(slides){

		var slidesWithContent = []

		// since we load a list of files, we get only urls, loop to get html-content
		_.each(slides, function(slide){
			$.get(slide.url,{'dataType':'html'}, function(data){

				slidesWithContent.push({'file':slide.file,'data':data})
				
				// get is async. render slides only once they're all loaded 
				if(slidesWithContent.length==slides.length){
					renderSlides(slidesWithContent)
				};
			});
		});

	});
});