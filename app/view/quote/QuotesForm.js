Ext.define('QuotesApp.view.quote.QuotesForm',{
	extend: 'Ext.form.Panel',
	xtype: 'quotesform',
	id: 'quotesform',

	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Hidden',
		'Ext.Button',
		'Ext.field.TextArea'
	],

	config: {
		title: 'Add Quote',
		timeout: 10,
		standarSubmit: false,
		url: 'http://localhost:8081/quotesrest',
		method: 'post',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						text: 'Authors',
						id: 'addquotesbackbutton'
					}
				]
			},
			{
				xtype: 'panel',
				items: [
					{
						cls: 'quoteform',
						html: [
							'<h1>Author info placeholder</h1>'
						].join("")
					},
					{
						xtype: 'fieldset',
						//title: 'Add quotes',
						instructions: 'Please fill the form and tap Submit.',
						items: [
							{
								name: 'entity_id',
								xtype: 'hiddenfield',
								value: ''
							},
							{
								name: 'author_id',
								xtype: 'hiddenfield',
								value: '2'
							},
							{
								name: 'quote',
								xtype: 'textareafield',
								label: 'Quote',
								maxRows: 2,
								labelWidth: '40%'
							},
							{
								name: 'location',
								xtype: 'textfield',
								label: 'Location',
								labelWidth: '40%'
							}
						]
					},
					{
						xtype: 'button',
						itemId: 'addQuoteButton',
						margin: 20,
						padding: 8,
						text: 'Submit',
						ui: 'confirm'
					}
				]
			}
		]
	}
});