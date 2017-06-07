Ext.define('QuotesApp.view.quote.QuoteDataItem',{
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'quotedataitem',

	config: {
		width: '90%',
		baseCls: 'x-authorsquotes',
		itemCls: 'x-quotes-ext',
		items:
		[
			{
				xtype: 'panel',
				layout: {
					type: 'vbox'
				},
				baseCls: 'x-quotes-temp',
				scrollable: null,
				itemId: 'quoteinfo',
				items: [
					{
						xtype: 'component',
						html: 'val2',
						itemId: 'quotequote',
						baseCls: 'x-quote-quote'
					}
				]
			}
		]
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
			}
		}

		me.callParent(arguments);
	}
});