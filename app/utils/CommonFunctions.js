Ext.define('QuotesApp.utils.CommonFunctions',{
	singleton: true,

	displayQuotesByAuthor: function(author_id,amv) {
		console.log("Display quotes by author");
		authorsS=Ext.getStore('Authors');
		var re=new RegExp("^"+author_id+"$");

		authn=authorsS.findRecord('entity_id',re);
		quotesd=authn.Quotes(function(some){
		});
		
		proxy=quotesd.getProxy();
		proxy.setExtraParams({"author_id":author_id});

		quotesd.load({
			callback: function (records,operation,success) {
				if(!success)
				{
					Ext.Msg.alert('Error','An error ocurred. Try again later.');
				}
				else if(!records.length && 0)//@todo: remove this. and 0 just to have a way to add quotes to the author
				{
					Ext.Msg.alert('No quotes','No quotes found for this author.');
				}
				else
				{
					loadQuotes(re);
				}
			},
			scope: this
		});

		quotesd.filter("author_id", re);

		if(!this.quotesListView)
		{
			this.quotesListView=Ext.create('QuotesApp.view.quote.QuoteListView');
		}
		else
		{
			this.quotesListView.destroy();
			this.quotesListView=Ext.create('QuotesApp.view.quote.QuoteListView');
		}

		var qlv=this.quotesListView;

		var loadQuotes=function(re){
			quotesS=Ext.getStore('Quotes');
			quotesS.setData(quotesd.getData().all);
			quotesS.filter("author_id",re);
			amv.setActiveItem(qlv);
		};
	}
});