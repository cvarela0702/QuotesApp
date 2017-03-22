Ext.define('QuotesApp.view.quote.QuoteListView',{
	extend: 'Ext.List',
	xtype: 'quoteslist',

	config: {
		title: 'Quotes list',
		iconCls: 'list',
		cls: 'x-quotes',
		variableHeights: true,

		listeners: {
			itemtap: function(dv, ix, item, e) {
				setTimeout(function(){dv.deselect(ix);},500);
			}
		},

		data: [
			{ author_id: '2', quote: 'Freedom has a cost', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' },
			{ author_id: '2', quote: 'No pain, no gain', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' },
			{ author_id: '2', quote: 'Happy wife, happy life', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' }
		],

		//store: 'Quotes',

		itemTpl: [
			'{quote}'
		].join('')
	}
});