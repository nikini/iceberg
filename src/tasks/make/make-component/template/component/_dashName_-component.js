import app from 'modules/module.pa';

// Component files
import Controller from './<%= dashName %>-component-controller';
import template from './<%= dashName %>-component.html';
import './<%= dashName %>-component.scss';

// Subcomponents (if any)
// import ...

// Component definition
app.component('<%= camelCaseName %>', {
	templateUrl: template,
	bindings: {
	},
	controller: Controller,
});
