// Slideshow, adapted from Indexhibit's jquery.slideshow.js (v2.1.5).
// The original fetched each slide from the server (ajax.php); here the slides come from the
// `slides` list the page writes out, and the same HTML is built in the browser.
// Behaviour kept: fade, "1 of N" counter, Previous | Next, click image = next, arrow keys,
// hover arrows over the left/right 30% of the image (they appear after the first change, as before).

var active = 0;
var zindex = 999;
var disable_click = false;

$(document).ready(function()
{
	var tmp = $('#slideshow div#slide1000').height();
	if (tmp) $('#slideshow').height(tmp);
});

// images without stored width/height: size the box once the first one has loaded
$(window).load(function()
{
	var tmp = $('#slideshow div#slide1000').height();
	if (tmp) $('#slideshow').height(tmp);
});

function next()
{
	if (typeof slides == 'undefined' || slides.length < 2) return false;
	active = active + 1;
	if ((active + 1) > slides.length) active = 0;
	getNode(active);
}

function previous()
{
	if (typeof slides == 'undefined' || slides.length < 2) return false;
	active = active - 1;
	if ((active + 1) == 0) active = (slides.length - 1);
	getNode(active);
}

function getNode(i)
{
	loading();
	var s = slides[i];

	if (!s.width || !s.height)
	{
		// size unknown: load the image first, then build the slide
		var probe = new Image();
		probe.onload = function() { s.width = probe.width; s.height = probe.height; buildSlide(s); };
		probe.onerror = function() { buildSlide(s); };
		probe.src = s.src;
		return false;
	}
	buildSlide(s);
	return false;
}

function buildSlide(s)
{
	var w = s.width || 0, h = s.height || 0;
	var zone = Math.round(w * 0.3);
	var html = "<a id='slide-previous' style='width: " + zone + "px; height: " + (h - 90) + "px;' href='#' onclick=\"previous(); return false;\">previous</a>"
		+ "<a id='slide-next' style='left: " + (w - zone) + "px; width: " + zone + "px; height: " + (h - 90) + "px;' href='#' onclick=\"next(); return false;\">next</a>"
		+ "<div id=\"slide" + zindex + "\" class=\"picture\" style=\"z-index: " + zindex + "; position: absolute; display: none;\">"
		+ "<img src=\"" + s.src + "\"" + (w ? " width=\"" + w + "\" height=\"" + h + "\"" : "") + " />"
		+ (s.caption ? "<div class='captioning'><div class='caption'>" + s.caption + "</div></div>" : "")
		+ "</div>\n";

	fillShow(html, h);
	disable_click = false;
	$('span#total em').html(active + 1);
}

function loading()
{
	// remove previous and next slides
	$('a#slide-previous').remove();
	return;
}

function adjust_height(next)
{
	$('#slideshow').height(next);
	return;
}

function fillShow(content, next_height)
{
	$('#slideshow').append(content);
	var adj_height = $('#slideshow div#slide' + zindex).height();

	if (fade == true)
	{
		$('#slideshow div#slide' + (zindex + 1)).fadeOut('1000').queue(function(next){$(this).remove();});
		$('#slideshow div#slide' + zindex).fadeIn('1000');
	}
	else
	{
		$('#slideshow div#slide' + (zindex + 1)).remove();
		$('#slideshow div#slide' + zindex).show();
	}

	adjust_height(adj_height);

	// count down
	zindex--;
}

// preload the other slides, as the original did
$(window).load(function()
{
	if (typeof slides == 'undefined') return;
	$.each(slides, function(i, s) { if (i > 0) $('<img/>')[0].src = s.src; });
});

$(document).keydown(function(e)
{
	if (e.keyCode == 37) {
		if (disable_click == true) return false;
		disable_click = true;
		previous();
	}

	if (e.keyCode == 39) {
		if (disable_click == true) return false;
		disable_click = true;
		next();
	}
});
