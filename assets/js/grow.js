// Click-to-enlarge for publication covers, adapted from Indexhibit's jquery.ndxz_grow.js (v2.1.5).
// The original fetched the large image HTML from the server (ajax.php); here it is built from the
// data-full / data-width / data-height attributes on each .picture_holder.
// Behaviour kept: click a cover to show it full size, click again to shrink it, one open at a time.
(function($){
$.fn.ndxz_grow = function()
{
	var tmpnode = {};
	var active = 0;
	var enable = true;

	function grownHtml(node, src, w, h)
	{
		return "<div class='picture_holder' id='node" + node + "' style='width: " + (w + 25) + "px; padding-bottom: 25px;'>"
			+ "<div class='picture' style='width: " + w + "px; height: " + h + "px; position: relative;'>"
			+ "<div><a href='#' class='link' id='a" + node + "' onclick=\"$.fn.ndxz_grow.grower(this, false); return false;\">"
			+ "<img src='" + src + "' width='" + w + "' height='" + h + "' alt='' /></a></div></div></div>";
	}

	$.fn.ndxz_grow.grower = function(obj, state)
	{
		if (enable == false) return false;
		enable = false;

		var node = obj.id.replace('a', '');
		var previous = 0;
		if (active != node) { previous = active; active = node; } else { active = 0; }

		if (state == true)
		{
			var holder = $('#node' + node);
			tmpnode[node] = holder.clone();
			var src = holder.attr('data-full');
			var w = parseInt(holder.attr('data-width'), 10);
			var h = parseInt(holder.attr('data-height'), 10);

			var show = function(w, h)
			{
				$('div').remove('.once');
				if (previous != 0 && tmpnode[previous]) $('#node' + previous).replaceWith(tmpnode[previous]);
				$('#node' + node).replaceWith(grownHtml(node, src, w, h));
				$.fn.ndxz_grow.flow();
				enable = true;
			};

			if (w && h) show(w, h);
			else
			{
				var probe = new Image();
				probe.onload = function() { show(probe.width, probe.height); };
				probe.onerror = function() { enable = true; };
				probe.src = src;
			}
		}
		else
		{
			$('#node' + node).replaceWith(tmpnode[node]);
			$.fn.ndxz_grow.flow();
			enable = true;
		}
		return false;
	};

	// wrap rows: insert a clearing div before any holder that would overflow the container
	$.fn.ndxz_grow.flow = function()
	{
		$('div').remove('.once');
		var thiswidth = 0;
		var bigwidth = $('#img-container').width();
		$('div.picture_holder').each(function()
		{
			var thewidth = $(this).width();
			thiswidth = parseInt(thiswidth) + parseInt(thewidth);
			if (thiswidth > bigwidth)
			{
				$(this).prev('div.picture_holder').after("<div class='once'><!-- --></div>");
				thiswidth = thewidth;
			}
		});
	};

	return this;
};
})(jQuery);

$(document).ready(function()
{
	$('.picture_holder').ndxz_grow();
});
