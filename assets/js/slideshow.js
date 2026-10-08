// Slideshow, adapted from Indexhibit's jquery.slideshow.js (v2.1.5).
// The original fetched each slide from the server (ajax.php); here the slides come from the
// `slides` list the page writes out, and the same HTML is built in the browser.
// Behaviour kept: fade, "1 of N" counter, Previous | Next, click image = next, arrow keys,
// hover arrows over the left/right 30% of the image (they appear after the first change, as before).
// Added: automatic change every `slideshow_interval` seconds (set in _config.yml, or per page; 0 = off).
// Added: `slideshow_box` (px) keeps the frame at one fixed height on project and exhibition pages.

var active = 0;
var zindex = 999;
var disable_click = false;
var autoplay_timer = null;

function autoplayOn()
{
	return typeof slides != 'undefined' && slides.length > 1
		&& typeof slideshow_interval != 'undefined' && slideshow_interval > 0;
}

// (re)start the countdown to the next automatic change; clicks and arrow keys restart it too
function scheduleAutoplay()
{
	if (!autoplayOn()) return;
	clearTimeout(autoplay_timer);
	autoplay_timer = setTimeout(function() {
		if (document.hidden) { scheduleAutoplay(); return; }
		next();
	}, slideshow_interval * 1000);
}

function fixedBox()
{
	return typeof slideshow_box != 'undefined' && slideshow_box > 0;
}

$(document).ready(function()
{
	if (fixedBox()) return;
	var tmp = $('#slideshow div#slide1000').height();
	if (tmp) $('#slideshow').height(tmp);
});

// images without stored width/height: size the box once the first one has loaded
$(window).load(function()
{
	if (fixedBox()) return;
	var tmp = $('#slideshow div#slide1000').height();
	if (tmp) $('#slideshow').height(tmp);
});

function next()
{
	if (typeof slides == 'undefined' || slides.length < 2) return false;
	scheduleAutoplay();
	active = active + 1;
	if ((active + 1) > slides.length) active = 0;
	getNode(active);
}

function previous()
{
	if (typeof slides == 'undefined' || slides.length < 2) return false;
	scheduleAutoplay();
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
	$('a#slide-next').remove();

	// each change counts z-index down; with automatic changes it would run out, so start again from the top
	if (zindex < 2)
	{
		$('#slideshow div#slide' + (zindex + 1)).attr('id', 'slide1000').css('z-index', 1000);
		zindex = 999;
	}
	return;
}

function adjust_height(next)
{
	if (fixedBox()) return;
	// with automatic changes, only grow the box, so the text below doesn't jump up and down
	if (autoplayOn() && next < $('#slideshow').height()) return;
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

	// with automatic changes, make the box as tall as the tallest image from the start
	if (autoplayOn() && !fixedBox())
	{
		var tallest = 0;
		$.each(slides, function(i, s) { if (s.height > tallest) tallest = s.height; });
		if (tallest > $('#slideshow').height()) $('#slideshow').height(tallest);
	}
	scheduleAutoplay();
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
