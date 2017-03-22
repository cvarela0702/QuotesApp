Ext.define('QuotesApp.view.MainPanel',{
	extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',
	requires: [
		'Ext.TitleBar',
		'QuotesApp.view.author.AuthorListView'
	],

	config: {
		tabBarPosition: 'bottom',
		ui: 'light',
		id: 'mainpanelview',
		itemId: 'mainpanelview',

		items: [
			{
				xtype: 'authorslist',
				title: 'Authors List',
				scrollable: true,
				badgeText: '3'
			}
		]
	}
});