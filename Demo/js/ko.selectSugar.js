/* 
	Author: Zac Braddy
	Email: zacharybraddy.at.gmail.com
	LinkedIn: https://uk.linkedin.com/pub/zac-braddy/22/81b/17a
*/

/*
The MIT License (MIT)

Copyright (c) 2015 Zac Braddy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function KoSelectOption(sName, oValue, bIsDefault) {
	this.name = typeof(sName) !== 'undefined' ? sName : null;
	this.val = typeof(oValue) !== 'undefined' ? oValue : null;
	this.isDefault = typeof(bIsDefault) !== 'undefined' ? bIsDefault : null;
};

ko.observable.fn.KoSelectObservable = function()
{	
	var self = this;
	
	function KoSelectObservable_addSingleOption(oNewValue)
	{	
		if (typeof(oNewValue) === 'undefined') return;
		
		var optionToInsert = TryParseKoSelectOption(oNewValue);
		
		if (typeof(optionToInsert) !== 'undefined')
		{
			this.optionsList.push(optionToInsert);
			if (oNewValue.isDefault) self(oNewValue.val);
		} else {
			optionToInsert = new KoSelectOption();
			this.optionsList.push(optionToInsert);
			console.log('The KoSelect option was not inserted because the object used for the insertion was malformed. An empty option has been inserted instead.');
		}
	}
	
	function KoSelectObservable_appendArray(aValues)
	{
		if (typeof(aValues) === 'undefined') return;
		if (aValues.length === 0) return;
		if (aValues.constructor !== Array)
		{ 
			throw new TypeError('No options added to KoSelect object because the value passed to appendArray was not an Array');
			return;
		}
		
		var valuesForInsertion = [];
		var validationFailed = false;
		
		for (var i in aValues)
		{
			var valueToInsert = TryParseKoSelectOption(aValues[i]);
			if (typeof(valueToInsert) === 'undefined') 
			{
				validationFailed = true;
				valueToInsert = new KoSelectOption();
			}
			valuesForInsertion.push(valueToInsert);
			if (valueToInsert.isDefault) self(valueToInsert.val);
		}
		
		self.optionsList.push.apply(self.optionsList, valuesForInsertion);
		if (validationFailed)
		{
			console.log("Some KoSelect options in the array loaded were found to be malformed. For these instances an empty option has been inserted instead.");
		}
	}
	
	function KoSelectObservable_loadArray(aValues)
	{
		if (typeof(aValues) === 'undefined') return;
		if (aValues.constructor !== Array)
		{ 
			throw new TypeError('No options added to KoSelect object because the value passed to loadArray was not an Array');
			return;
		}
		
		KoSelectObservable_clearOptions();
		KoSelectObservable_appendArray(aValues);
	}
	
	function KoSelectObservable_clearOptions()
	{
		self.optionsList.removeAll();
	}
	
	function TryParseKoSelectOption(objToParse)
	{
		var optionToInsert = new KoSelectOption();
		for (var property in optionToInsert)
		{
			if (objToParse.hasOwnProperty(property))
			{
				optionToInsert[property] = objToParse[property]
			} else {
				return undefined;
			}
		}
		
		return optionToInsert;
	}
	
	self.optionsList = ko.observableArray();
	self.addSingleOption = KoSelectObservable_addSingleOption;
	self.appendArray = KoSelectObservable_appendArray;
	self.loadArray = KoSelectObservable_loadArray;
	self.clearOptions = KoSelectObservable_clearOptions;
	
	return self;
};

ko.bindingHandlers.KoSelect = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		ko.applyBindingsToNode(element, {options: valueAccessor().optionsList, optionsText: 'name', optionsValue: 'val', value: valueAccessor(), valueAllowUnset: true});
    }
};
