Ext.define('QuotesApp.view.quote.QuoteShow',{
	extend: 'Ext.Container',
    xtype: 'quoteshow',

    requires: [
    	'QuotesApp.view.quote.QuoteListView'
    ],

    config: {
    	title: 'Quotes',
        baseCls: 'x-show-quote',
        layout: 'vbox',

        data: [
        	{ first_name: 'Christian', last_name: 'Varela', dob: '1982-07-02' }
        ],

        itemTpl: [
			'{quote}'
		].join(''),

        items: [
        	{
            	xtype: 'quoteslist',
            },
        	{
	            xtype: 'panel',
	            html: 'This is an item'
	        },
        	{
                id: 'content',
                tpl: [
                    '<div class="top">',
                        '<div class="name">Author: {last_name}, {first_name}<span>{dob}</span></div>',
                    '</div>'
                ].join('')
            },
            {
            	xtype: 'quoteslist',
            }
        ]
    },

    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
        }
    }
});