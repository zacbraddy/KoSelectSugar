/*
Copyright (c) 2008-2015 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function KoSelectOption(sName, oValue, bIsDefault) {
	this.name = typeof(sName) !== 'undefined' ? sName : null;
	this.val = typeof(oValue) !== 'undefined' ? oValue : null;
	this.isDefault = typeof(bIsDefault) !== 'undefined' ? bIsDefault : null
};

function KoSelectObservable_addSingleOption(oNewValue, bImmediateInsert)
{
	if (typeof(bImmediateInsert) === 'undefined') bImmediateInsert = true;
	
	var optionToInsert = new KoSelectOption();
	for (var property in optionToInsert)
	{
		if (oNewValue.hasOwnProperty(property))
		{
			optionToInsert[property] = oNewValue[property]
		} else {
			console.error('A KOSelectSugar option was not inserted because the KOSelectOption object used for the insertion was malformed.');
			optionToInsert = new KoSelectOption();
			if (bImmediateInsert) this.optionsList.push(optionToInsert);
			return optionToInsert
		}
	} 

	if (bImmediateInsert) 
	{
		this.optionsList.push(optionToInsert);
		if (oNewValue.isDefault) this(oNewValue.val)
		
	}
	return optionToInsert
}

ko.observable.fn.KoSelectObservable = function()
{
	var self = this;
	self.optionsList = ko.observableArray();
	self.addSingleOption = KoSelectObservable_addSingleOption;
	
	return self
};

ko.bindingHandlers.KoSelect = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		ko.applyBindingsToNode(element, {options: valueAccessor().optionsList, optionsText: 'name', optionsValue: 'val', value: valueAccessor(), valueAllowUnset: true})
    }
};
