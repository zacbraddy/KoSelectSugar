ko.bindingHandlers.KoSelect = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		ko.applyBindingsToNode(element, {options: valueAccessor().optionsList, optionsText: 'name', optionsValue: 'val', value: valueAccessor(), valueAllowUnset: true});
    }
};

ko.observable.fn.KoSelectObservable = function()
{
	var self = this;
	self.optionsList = ko.observableArray();
	
	return self;
};