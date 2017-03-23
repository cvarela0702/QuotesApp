Ext.define('QuotesApp.view.MainView',{
	extend: 'Ext.navigation.View',
	fullscreen: true,
	xtype: 'mainview',

	config: {
		title: 'Quotes',
		iconCls: 'home',
		variableHeights: true,
		autoDestroy: true,

		items: [
			{
				xtype: 'mainpanel',
				//xtype: 'quoteslist',
				title: 'Authors'
			}
		]
	}
});