// Site search: loads search.json (built by Jekyll) and lists the pages whose title or text
// contains every word typed in the search box. Runs in the browser, no outside service.
$(function()
{
	var q = (new URLSearchParams(window.location.search).get('q') || '').trim();
	$('input.ndxz_search').val(q);
	var status = $('#search-status'), out = $('#search-results');
	if (!q) { status.text('Type a word in the search box.'); return; }

	// lower case, accents removed, so "zurich" finds "Zürich"
	function fold(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
	function esc(s) { return $('<div/>').text(s).html(); }
	var words = fold(q).split(/\s+/);

	$.getJSON(searchIndexUrl, function(pages)
	{
		var hits = [];
		$.each(pages, function(i, p)
		{
			var title = fold(p.title), text = fold(p.text), score = 0;
			for (var w = 0; w < words.length; w++)
			{
				if (title.indexOf(words[w]) > -1) score += 10;
				else if (text.indexOf(words[w]) > -1) score += 1;
				else return; // every word must appear
			}
			hits.push({ p: p, score: score });
		});
		hits.sort(function(a, b) { return b.score - a.score; });

		status.html(hits.length + (hits.length == 1 ? ' result' : ' results') + ' for <strong>' + esc(q) + '</strong>');
		$.each(hits, function(i, h)
		{
			var p = h.p, snippet = '';
			var at = fold(p.text).indexOf(words[0]);
			if (at > -1)
			{
				var start = Math.max(0, at - 60);
				snippet = (start > 0 ? '… ' : '') + esc(p.text.substr(start, 180)) + (start + 180 < p.text.length ? ' …' : '');
			}
			out.append('<p><a href="' + p.url + '">' + esc(p.title) + '</a><br /><span class="search-section">'
				+ esc(p.section) + (p.year ? ', ' + esc(String(p.year)) : '') + '</span>'
				+ (snippet ? '<br />' + snippet : '') + '</p>');
		});
	}).fail(function() { status.text('The search is not available right now.'); });
});
