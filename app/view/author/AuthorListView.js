Ext.define('QuotesApp.view.author.AuthorListView',{
	extend: 'Ext.List',
	xtype: 'authorslist',

	require: [
		'QuotesApp.store.Authors'
	],

	config: {
		title: 'Authors List',
		iconCls: 'user',
		cls: 'x-authors',
		onItemDisclosure: true,
		variableHeights: true,

		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				
				items: [
					{ xtype: 'spacer' },
					{
						xtype: 'searchfield',
						id: 'authorssearch',
						placeHolder: 'Search...'
					},
					{ xtype: 'spacer' }
				]
			}
		],

		listeners: {
			itemtap: function(dv,ix,item,e) {
				setTimeout(function(){dv.deselect(ix);},500);
			}
		},

		// data: [
		// 	{ first_name: 'Christian', last_name: 'Varela', dob: '1982-07-02' }
		// ],

		store: 'Authors',
		emptyText: 'No authors found.',
		grouped: true,
		indexBar: true,

		itemTpl: [
			'{last_name}, {first_name}',
			'<br /><span>{dob}</span>'
		].join('')
	}
});