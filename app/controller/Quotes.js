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
			quotesFormView: 'quotesform',
			qfaddquoteButton: 'quotesform #addQuoteButton',
			qfauthorsBackButton: 'quotesform #addquotesbackbutton'
		},
		control: {
			quotesFormView: {
				activate: 'onQuotesFormViewActivate'
			},
			authorsButton: {
				tap: 'onAuthorsButtonTap'
			},
			addQuotesButton: {
				tap: 'onAddQuotesButtonTap'
			},
			qfaddquoteButton: {
				tap: 'onQfAddQuoteButton'
			},
			qfauthorsBackButton: {
				tap: 'onQfAuthorsBackButton'
			}
		}
	},

	onQuotesFormViewActivate: function(newActiveItem, view, oldActiveItem, eOpts ) {
		QuotesS=Ext.getStore('Quotes');
		console.log("activate");
		
		if(QuotesS.isFiltered()==true)
		{
			console.log("filtered");
			filters=QuotesS.getFilters();
			filters.forEach(function(item,index){
				console.log(item.getProperty());
				if(item.getProperty()=='author_id')
				{
					patt=/\/\^(\d+)\$\//;
					re=new RegExp(patt);
					res=re.exec(item.getValue());
					console.log(res);
					newActiveItem.setValues({author_id: res[1]})
					console.log("Set author id in form");
					console.log(newActiveItem.getValues());
				}
			});
		}
	},

	onQfAuthorsBackButton: function(button,e,eOpts) {
		this.backToAuthors();
	},

	onQfAddQuoteButton: function(button,e,eOpts) {
		console.log('Adding quote');
		var form=button.up('formpanel'),
			values= form.getValues(),
			quotesform=this.getQuotesFormView();


		form.setMasked(true);
		form.submit({
			url: form.getUrl(),
			waitMsg: 'Please wait...',
			method: form.getMethod(),
			headers: {
				'Accept' : 'application/json',
				'Authorization' : 'Basic YmFzaWNfdXNlcjpTZWN1cmVQYXNzd29yZA=='
			},
			success: function(form,result,datas,datar) {
				console.log("Success");
				if(form.getMethod()=='put')
				{
					Ext.Msg.alert('Success','The quote was edited successfully');
					var amv=Ext.getCmp('authormainview');
					QuotesApp.utils.CommonFunctions.displayQuotesByAuthor(form.getValues().author_id,amv);
				}
				else if(form.getMethod()=='post')
				{
					Ext.Msg.alert('Success','The quote was added successfully');
					var amv=Ext.getCmp('authormainview');
					QuotesApp.utils.CommonFunctions.displayQuotesByAuthor(form.getValues().author_id,amv);
				}
				console.log(form.getMethod());
			},
			failure: function(form,result) {
				console.log("Fail");
			}
		});
	},

	onAddQuotesButtonTap: function(button,e,eOpts) {
		var amv=this.getAuthorsMainView();
		this.quotesFormView=Ext.getCmp('quotesform');
		if(!this.quotesFormView)
		{
			console.log('Creating form');
			this.quotesFormView=Ext.create('QuotesApp.view.quote.QuotesForm');
		}
		var qfv=this.quotesFormView;
		qfv.setValues({ quote: '', location: '', entity_id: ''});
		qfv.setMethod('post');
		qfv.setUrl('http://localhost:8081/quotesrest');
		amv.setActiveItem(qfv);
	},

	onAuthorsButtonTap: function(button,e,eOpts){
		this.backToAuthors();
	},

	backToAuthors: function(){
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