Ext.define('QuotesApp.store.Quotes',{
	extend: 'Ext.data.Store',
	requires: ['QuotesApp.model.Quote'],

	config: {
		model: 'QuotesApp.model.Quote',
		autoLoad: true,
		autoSync: true,
		sorters: 'entity_id',

		proxy: {
			type: 'ajax',
			url: 'http://localhost:8081/quotes',
			username: 'basic_user',
			password: 'SecurePassword',
			withCredentials: true,
			reader: {
				type: 'json',
				rootProperty: '_embedded.quotes'
			}
		}
	}
});