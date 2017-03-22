Ext.define('QuotesApp.store.Authors',{
	extend: 'Ext.data.Store',
	requires: ['QuotesApp.model.Author'],

	config: {
		model: 'QuotesApp.model.Author',
		autoLoad: true,
		autoSync: true,
		sorters: 'entity_id',
		grouper: {
			groupFn: function(record) {
				return record.get('last_name')[0];
			}
		},

		proxy: {
			type: 'ajax',
			url: 'http://localhost:8081/authors',
			username: 'basic_user',
			password: 'SecurePassword',
			withCredentials: true,
			reader: {
				type: 'json',
				rootProperty: '_embedded.authors'
			}
		}
	}
});