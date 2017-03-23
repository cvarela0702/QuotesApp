Ext.define('QuotesApp.view.MainPanel',{
	extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',
	requires: [
		'Ext.TitleBar',
		'QuotesApp.view.author.AuthorListView',
		'QuotesApp.view.quote.QuoteListView'
	],

	config: {
		tabBarPosition: 'bottom',
		ui: 'light',
		id: 'mainpanelview',
		itemId: 'mainpanelview',

		items: [
			{
				//xtype: 'authorslist',
				xtype: 'quoteslist',
				title: 'Authors List',
				scrollable: true,
				badgeText: '3'
			}
		]
	}
});