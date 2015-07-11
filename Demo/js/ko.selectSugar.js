ko.bindingHandlers.KoSelect = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		ko.applyBindingsToNode(element, {options: valueAccessor().optionsList, optionsText: 'name', optionsValue: 'val', value: valueAccessor(), valueAllowUnset: true})
    }
};

function KoSelectOption(sName, oValue, bDefaultSelected) {
	this.name = typeof(sName) !== 'undefined' ? sName : null;
	this.val = typeof(oValue) !== 'undefined' ? oValue : null;
	this.defaultSelected = typeof(bDefaultSelected) !== 'undefined' ? bDefaultSelected : null
};

function KoSelect_addSingleOption(oNewValue, bDirectInsert)
{
	if (typeof(bDirectInsert) === 'undefined') bDirectInsert = true;
	
	var optionToInsert = new KoSelectOption();
	for (var property in optionToInsert)
	{
		if (oNewValue.hasOwnProperty(property))
		{
			optionToInsert[property] = oNewValue[property]
		} else {
			console.error('A KOSelectSugar option was not inserted because the KOSelectOption object used for the insertion was malformed.');
			optionToInsert = new KoSelectOption();
			if (bDirectInsert) this.optionsList.push(optionToInsert);
			return optionToInsert
		}
	} 

	if (bDirectInsert) 
	{
		this.optionsList.push(optionToInsert);
		if (oNewValue.defaultSelected) this(oNewValue.val)
		
	}
	return optionToInsert
}

ko.observable.fn.KoSelectObservable = function()
{
	var self = this;
	self.optionsList = ko.observableArray();
	self.addSingleOption = KoSelect_addSingleOption;
	
	return self
};