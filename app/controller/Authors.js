Ext.define('QuotesApp.controller.Authors',{
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			authorsListView: 'authorslist',
			authorsSearch: 'authorslist #authorssearch'
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
		console.log('disclosed');
	},

	onAuthorsSearchKeyup: function(field) {
		//console.log('keyup');
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
		//console.log('Search cleared');
		authorsS=Ext.getStore('Authors');
		authorsS.clearFilter();
	}
});