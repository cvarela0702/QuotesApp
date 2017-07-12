Ext.define('QuotesApp.view.author.MainView',{
	extend: 'Ext.Panel',
	xtype: 'authormainview',
	id: 'authormainview',
	itemId: 'authormainview',
	
	require: [
		'QuotesApp.view.author.AuthorListView',
		'QuotesApp.view.quote.QuoteListView'
	],

	config: {
		layout: 'card',
		title: 'Authors',
		iconCls: 'user',
		fullscreen: true,
		scrollable: null,

		items: [
			{
				scrollable: true,
				xtype: 'authorslist',
				//xtype: 'quoteslist',
				//xtype: 'quotesform',
				title: 'Authors'
			}
		]
	}
});