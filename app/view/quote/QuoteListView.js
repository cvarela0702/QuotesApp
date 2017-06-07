Ext.define('QuotesApp.view.quote.QuoteListView',{
	extend: 'Ext.DataView',
	//extend: 'Ext.List',
	xtype: 'quoteslist',

	require: [
		'QuotesApp.store.Quotes',
		'QuotesApp.view.quote.QuoteDataItem'
	],

	config: {
		showAnimation: 'flip',
		autoDestroy: false,
		title: 'Quotes list',
		iconCls: 'list',
		cls: 'x-quotes',
		itemCls: 'x-quotes-ext',
		useComponents: true,
		defaultType: 'quotedataitem',
		variableHeights: true,
		striped: true,

		items: [
			{
				xtype: 'toolbar',
				docked: 'top',

				items: [
					{
						xtype: 'button',
						ui: 'back',
						flex: 1,
						text: 'Authors',
						id: 'authorsbutton'
					},
					{
						xtype: 'searchfield',
						id: 'quotessearch',
						placeHolder: 'Search quotes...',
						flex: 2
					}
				]
			}
		],

		// listeners: {
		// 	itemtap: function(dv, ix, item, e) {
		// 		setTimeout(function(){dv.deselect(ix);},500);
		// 	}
		// },

		// data: [
		// 	{ author_id: '2', quote: 'Freedom has a cost', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' },
		// 	{ author_id: '2', quote: 'No pain, no gain', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' },
		// 	{ author_id: '2', quote: 'Happy wife, happy life', location: 'Miami, Fl', created_at: '2017-03-22 18:15:00' }
		// ],

		store: 'Quotes',
		emptyText: 'No quotes found.'

		// itemTpl: [
		// 	'{quote}'
		// ].join('')
	}
});