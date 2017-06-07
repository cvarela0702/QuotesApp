Ext.define('QuotesApp.model.Quote',{
	extend: 'Ext.data.Model',
	requires: ['Ext.data.identifier.Uuid'],
	
	config: {
		idProperty: 'entity_id',
		identifier: 'uuid',

		fields: [
			{ name: 'entity_id', type: 'auto' },
			{ name: 'author_id', type: 'auto' },
			{ name: 'quote', type: 'auto' },
			{ name: 'location', type: 'auto' },
			{ name: 'created_at', type: 'auto' }
		],

		validations: [
			{
				type: 'presence',
				field: 'author_id',
				message: 'Please provide an author_id'
			},
			{
				type: 'presence',
				field: 'quote',
				message: 'Please provide a Quote'
			},
			{
				type: 'presence',
				field: 'created_at',
				message: 'Please provide a date of quote'
			}
		],

		associations: [
			{
				type: 'belongsTo',
				model: 'QuotesApp.model.Author',
				primaryKey: 'entity_id',
				foreignKey: 'author_id'
			}
		],

		//proxy: {/*This is the local storage: The local storage proxy will make sure that all data persist into the browser localstorage.*/
		//	type: 'localstorage',
		//	id: 'quotes'
		//}
		proxy: {
			type: 'rest',
			url: 'http://localhost:8081/quotesrest',
			username: 'basic_user',
			password: 'SecurePassword',
			withCredentials: true,
			reader: {
				type: 'json',
				rootProperty: '_embedded.quotesrest'
			}
		}
	}
});