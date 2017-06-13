Ext.define('QuotesApp.controller.Quotes',{
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			authorsListView: 'authorslist',
			authorsSearch: 'authorslist #authorssearch',
			authorsMainView: 'authormainview',
			quotesListView: 'quoteslist',
			authorsButton: 'quoteslist #authorsbutton',
			addQuotesButton: 'quoteslist #addquotesbutton',
			quotesFormView: 'quotesform'
		},
		control: {
			authorsButton: {
				tap: 'onAuthorsButtonTap'
			},
			addQuotesButton: {
				tap: 'onAddQuotesButtonTap'
			},
			'quotesform #addQuoteButton': {
				tap: 'onAddQuotesFormButtonTap'
			}
		}
	},

	onAddQuotesFormButtonTap: function(button,e,eOpts) {
		console.log('Adding quote');
	},

	onAddQuotesButtonTap: function(button,e,eOpts) {
		var amv=this.getAuthorsMainView();
		if(!this.quotesFormView)
		{
			this.quotesFormView=Ext.create('QuotesApp.view.quote.QuotesForm');
		}
		var qfv=this.quotesFormView;
		amv.setActiveItem(qfv);
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