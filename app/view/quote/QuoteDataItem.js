Ext.define('QuotesApp.view.quote.QuoteDataItem',{
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'quotedataitem',

	config: {
		width: '100%',
		baseCls: 'x-authorsquotes',
		itemCls: 'x-quotes-ext',
		items:
		[
			{
				xtype: 'panel',
				layout: {
					type: 'hbox'
				},
				baseCls: 'x-quotes-temp',
				scrollable: null,
				itemId: 'quoteinfo',
				items: [
					{
						xtype: 'component',
						html: 'val2',
						itemId: 'quotequote',
						baseCls: 'x-quote-quote',
						flex: 3
					},
					{
						flex: 1,
						xtype: 'formpanel',
						layout: {
							type: 'hbox'
						},
						baseCls: 'x-quotes-form',
						scrollable: null,
						items: [
							{
								itemId: 'editbutton',
								flex: 1,
								xtype: 'button',
								//text: 'Edit',
								iconCls: 'compose',
								margin: '0 7 0 0',
								height: 50,
								ui: 'plain'
							},
							{
								itemId: 'deletebutton',
								flex: 1,
								xtype: 'button',
								//text: 'Edit',
								iconCls: 'delete',
								margin: '0 7 0 0',
								height: 50,
								ui: 'plain'
							}
						]
					}
				]
			}
		],
		emptyText: 'No authors found.'
	},

	updateRecord: function(record) {
		var me=this;
		console.log(record);
		if(Ext.getClassName(me)=='QuotesApp.view.quote.QuoteDataItem')
		{
			var elem=me.down('#quoteinfo #quotequote');
			if(elem!=null)
			{
				itquote=record.get('quote');
				if(itquote)
				{
					elem.setHtml(
						itquote
					);
				}
				me.down('#editbutton').addListener('tap', this.handleEditTap, this, {single: false});
				me.down('#deletebutton').addListener('tap', this.handleDeleteTap, this, {single: false});
			}
		}

		me.callParent(arguments);
	},

	handleEditTap: function(button,e,eOpts)
	{
		record=this.getRecord();
		console.log("Edit: ");
		console.log(record.getData());
		//redirect to form, fill it with current data
		if(!this.AuthorsMainView)
		{
			this.AuthorsMainView=button.up('authormainview');
		}
		else
		{
			this.AuthorsMainView=button.up('authormainview');
		}
		this.quotesFormView=Ext.getCmp('quotesform');
		if(!this.quotesFormView)
		{
			this.quotesFormView=Ext.create('QuotesApp.view.quote.QuotesForm');
		}
		var amv=this.AuthorsMainView;
		var qfv=this.quotesFormView;
		qfv.setValues(record.getData());
		qfv.setUrl(qfv.getUrl()+'/'+record.data.entity_id);
		qfv.setMethod('put');
		amv.setActiveItem(qfv);
		console.log(this.quotesFormView);
	},

	handleDeleteTap: function(button,e,eOpts)
	{
		record=this.getRecord();
		console.log("Delete: "+record.data.entity_id);
		Ext.Msg.confirm(
			"Delete quote",
			"Are you sure you want to delete the quote?",
			this.deleterecord,
			this);
		//Post delete after confirmation.
	},

	deleterecord: function(buttonID,value,opt)
	{
		console.log("about to delete");
		console.log(buttonID);
		console.log(value);
		console.log(opt);
		record=this.getRecord();
		console.log(record);
		QuotesS=Ext.getStore('Quotes');
		if(buttonID=='yes')
		{
			QuotesS.remove(record);
			console.log("Removed");
			QuotesS.sync();
			console.log("Synchronized");
		}
	}
});