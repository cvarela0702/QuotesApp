Ext.define('QuotesApp.view.author.AuthorListView',{
	extend: 'Ext.List',
	xtype: 'authorslist',

	config: {
		title: 'Authors List',
		iconCls: 'list',
		cls: 'x-authors',
		variableHeights: true,

		listeners: {
			itemtap: function(dv,ix,item,e) {
				setTimeout(function(){dv.deselect(ix);},500);
			}
		},

		data: [
			{ first_name: 'Christian', last_name: 'Varela', dob: '1982-07-02' }
		],

		store: 'Authors',

		itemTpl: [
			'{first_name} {last_name}',
			'<span>{dob}</span>'
		].join('')
	}
});