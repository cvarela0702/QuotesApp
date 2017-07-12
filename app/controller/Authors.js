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
		
		var amv=this.getAuthorsMainView();
		QuotesApp.utils.CommonFunctions.displayQuotesByAuthor(author_id,amv);
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