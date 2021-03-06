Ext.define('QuotesApp.model.Author',{
	extend: 'Ext.data.Model',
	requires: ['Ext.data.identifier.Uuid'],
	config: {
		idProperty: 'entity_id',
		identifier: 'uuid',
		fields: [
			{ name: 'entity_id', type: 'auto' },
			{ name: 'first_name', type: 'auto' },
			{ name: 'last_name', type: 'auto' },
			{ name: 'dob', type: 'auto' },
			{ name: 'created_at', type: 'auto' }
		],

		associations: [
			{
				type: 'hasMany',
				model: 'QuotesApp.model.Quote',
				name: 'Quotes',
				associationKey: 'AuthQuotes',
				autoLoad: false,
				autoSync: false,
				primaryKey: 'entity_id'
			}
		],

		validations: [
			{
				type: 'presence',
				field: 'first_name',
				message: 'Please provide a first name'
			},
			{
				type: 'presence',
				field: 'last_name',
				message: 'Please provide a last name'
			},
			{
				type: 'presence',
				field: 'dob',
				message: 'Please provide a date of birth'
			}
		],

		proxy: {/*This is the local storage: The local storage proxy will make sure that all data persist into the browser localstorage.*/
			type: 'localstorage',
			id: 'authors'
		}
	}
});