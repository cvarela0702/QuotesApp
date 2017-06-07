Ext.define('QuotesApp.controller.Authors',{
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			authorsListView: 'authorslist',
			authorsSearch: 'authorslist #authorssearch',
			authorsMainView: 'authormainview',
			//authorsMainView: 'mainview', this is used when app.js has Ext.Viewport.add(Ext.create('QuotesApp.view.MainView')); uncommented
			quotesListView: 'quoteslist'
		},
		control: {
			authorsListView: {
				disclose: 'onAuthorsListViewDisclose'
			},
			authorsSearch: {
				keyup: 'onAuthorsSearchKeyup',
				clearicontap: 'onAuthorsSearchClearicontap'
			}
		}
	},

	onAuthorsListViewDisclose: function (list, record, target, index, e, eOpts){
		var author_id=record.data.entity_id;
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
		
		var amv=this.getAuthorsMainView();

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
	},

	onAuthorsSearchKeyup: function(field) {
		var value = field.getValue();
		authorsS=Ext.getStore('Authors');

		authorsS.clearFilter(!!value);
		if(value)
		{
			var searches = value.split(','),
					regexps = [],
					i, regex;
					
			for (i = 0; i < searches.length; i++)
			{
				if (!searches[i]) continue;
				
				regex = searches[i].trim();
				regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
				
				regexps.push(new RegExp(regex.trim(), 'i'));
			}

			authorsS.filter(function(record){
				var matched = [];

				//loop through each of the regular expressions
				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i],
							didMatch = search.test(record.get('first_name')+record.get('last_name'));

					//if it matched the first or last name, push it into the matches array
					matched.push(didMatch);
				}

				return (regexps.length && matched.indexOf(true) !== -1);
			});
		}
	},

	onAuthorsSearchClearicontap: function() {
		authorsS=Ext.getStore('Authors');
		authorsS.clearFilter();
	}
});