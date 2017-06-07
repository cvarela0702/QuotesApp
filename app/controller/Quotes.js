Ext.define('QuotesApp.controller.Quotes',{
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			authorsListView: 'authorslist',
			authorsSearch: 'authorslist #authorssearch',
			authorsMainView: 'authormainview',
			quotesListView: 'quoteslist',
			authorsButton: 'quoteslist #authorsbutton'
		},
		control: {
			authorsButton: {
				tap: 'onAuthorsButtonTap'
			}
		}
	},

	onAuthorsButtonTap: function(button,e,eOpts){
		console.log("Back");
		quotesS=Ext.getStore('Quotes');
		if(quotesS.isFiltered())
		{
			quotesS.clearFilter();
		}

		var amv=this.getAuthorsMainView();
		var alv=this.getAuthorsListView();
		amv.setActiveItem(alv);
	}
});