describe("KoSelectOption", function ()
{
	it("should initialise all members to null if no parameters are passed to the constructor", function () {
		var obj = new KoSelectOption();
		
		expect(obj.name).not.toBeUndefined();
		expect(obj.val).not.toBeUndefined();
		expect(obj.isDefault).not.toBeUndefined();
		expect(obj.name).toBeNull();
		expect(obj.val).toBeNull();
		expect(obj.isDefault).toBeNull()
	});
	
	it("should correctly initialise all members with the parameters passed into the constructor", function () {
		var obj = new KoSelectOption('name', 1, true);
		
		expect(obj.name).toEqual('name');
		expect(obj.val).toEqual(1);
		expect(obj.isDefault).toBe(true)
	})
});

describe("KoSelectObservable", function () {
	var obj;
	
	beforeEach(function () {
		obj = ko.observable().KoSelectObservable();
	});
	
	describe("Initialisation", function () {
		it("should initialise with the correct member functions and variables", function () {
			expect(obj.optionsList).not.toBeUndefined();
			expect(obj.addSingleOption).not.toBeUndefined();
			expect(ko.isObservable(obj.optionsList)).toBe(true);
			expect(obj.optionsList.destroyAll).not.toBeUndefined();
			expect(typeof(obj.addSingleOption)).toEqual('function')
		})
	});
	
	describe("KoSelectObservable_addSingleOption", function () {
		var cleanOptionObj;
		
		beforeEach(function () {
			cleanOptionObj = new KoSelectOption('name', 1, true);
		});
		
		it("should complete without exceptions if no parameters are passed in at all", function () {
			var container = function () {
				obj.addSingleOption();
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should push a KoSelectOption object onto the optionsList when an option is passed in", function () {
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj.optionsList().length).toEqual(1);
			expect(obj.optionsList()[0]).toEqual(cleanOptionObj);
		});
		
		it("should not add properties that aren't part of the KoSelectOption schema", function () {
			cleanOptionObj.random = 'member';
			
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj.optionsList()[0].random).toBeUndefined();
		});
		
		it("should insert an empty KoSelectOption when any malformed object is passed in", function () {
			obj.addSingleOption({random: 'member'});
			obj.addSingleOption('string');
			obj.addSingleOption(1);
			obj.addSingleOption(['array']);
		
			expect(obj.optionsList().length).toEqual(4);
			expect(obj.optionsList()[0]).toEqual(new KoSelectOption());
		});
	});
	
	describe("KoSelectObservable_appendArray", function () {
		var cleanArray;
		
		beforeEach(function () {
			cleanArray = [new KoSelectOption('name1', 1, true), new KoSelectOption('name2', 2, false), new KoSelectOption('name3', 3, false)];
		});
		
		it("should complete without exceptions if no parameters are passed in at all", function () {
			var container = function () {
				obj.appendArray();
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should take an empty array without exceptions", function () {
			var container = function () {
				obj.appendArray([]);
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should throw an error if something that is not an array is passed in", function () {
			var container = function () {
				obj.appendArray('break');	
			}
			
			expect(container).toThrowError(TypeError);
		});
		
		it("should load an array of clean objects", function ()
		{
			obj.appendArray(cleanArray);
			
			expect(obj.optionsList()).not.toBeUndefined();
			expect(obj.optionsList().length).toEqual(3);
			expect(obj.optionsList()[0]).toEqual(cleanArray[0]);
		});
		
		it("should insert all options it can but insert empty objects instead for the malformed objects found in the array", function () {
			var dirtyArray = cleanArray;
			dirtyArray.splice(1, 0, {random: 'member'});
			obj.appendArray(dirtyArray);
				
			expect(obj.optionsList()[0]).toEqual(cleanArray[0]);
			expect(obj.optionsList()[1]).toEqual(new KoSelectOption());
		});
		
		it("should not add properties that aren't part of the KoSelectOption schema", function () {
			var cleanOptionObj = new KoSelectOption('name', 1, true);
			cleanOptionObj.random = 'member';
			
			obj.appendArray([cleanOptionObj]);
			
			expect(obj.optionsList()[0].random).toBeUndefined();
		});
		
		it("should append an array of options to the existing array", function () {
			obj.appendArray(cleanArray);
			var appendedOption = new KoSelectOption('appendedOption', 3, false)
			obj.appendArray([appendedOption]);
			
			expect(obj.optionsList().length).toEqual(4);
			expect(obj.optionsList()[3]).toEqual(appendedOption);
		});
	});
	
	describe("KoSelectObservable_loadArray", function() {
		var oldArray;
		var newArray;
		
		beforeEach(function () {
			oldArray = [new KoSelectOption('name1', 1, true), new KoSelectOption('name2', 2, false), new KoSelectOption('name3', 3, false)];
			newArray = [new KoSelectOption('name12', 12, false), new KoSelectOption('name22', 22, true), new KoSelectOption('name32', 32, false)];
		});
		
		it("should load an array when the current array is empty", function () {
			obj.loadArray(oldArray);
			
			expect(obj.optionsList()).toBeDefined();
			expect(obj.optionsList().length).toEqual(3);
			expect(obj.optionsList()[0]).toEqual(oldArray[0]);
		});
		
		it("should not complete with no exceptions if an empty array is passed in to be loaded and the current array should be cleared", function () {
			obj.loadArray(oldArray);
			var container = function () {
				obj.loadArray([]);
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should not complete with no exceptions if an nothing is passed in to be loaded and the current array should be kept intact", function () {
			obj.loadArray(oldArray);
			var container = function () {
				obj.loadArray();
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList()).toEqual(oldArray);
		});
		
		it("should overwrite the current array with the new array to be loaded", function () {
			obj.loadArray(oldArray);
			obj.loadArray(newArray);
			
			expect(obj.optionsList()).toEqual(newArray);
		});
		
		it("should throw an error if something that is not an array is passed in and keep the original options intact", function () {
			obj.loadArray(oldArray);			
			var container = function () {
				obj.loadArray('break');	
			}
			
			expect(container).toThrowError(TypeError);
			expect(obj.optionsList()).toEqual(oldArray);
		});
	});
	
	describe("KoSelectObservable_clearOptions", function () {		
		beforeEach(function() {
			obj.optionsList.push(new KoSelectOption('name', 1, true));
		});
		
		it("should clear all options currently in the observable array", function () {
			obj.clearOptions();
			
			expect(obj.optionsList().length).toEqual(0);
		});
	});
	
	describe("defaulting functionality", function () {
		var cleanOptionObj;
		var cleanOptionArray;
		
		beforeEach(function () {
			cleanOptionObj = new KoSelectOption('name', 1, true);
			cleanOptionArray = [new KoSelectOption('name1', 1, false), new KoSelectOption('name2', 2, true), new KoSelectOption('name3', 3, false)];
		});
		
		it("should make the observable equal to the val when a single option is added with the isDefault flag set", function ()
		{
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj()).toEqual(cleanOptionObj.val);
		});
		
		it("should change the observable equal to the val with there is already a default and another option is added with the isDefault flag set", function () {
			obj.addSingleOption(new KoSelectOption('nameToBeOverwritten', 3, true));
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj()).toEqual(cleanOptionObj.val);
		});
		
		it("should leave the value of the observable if an option is added with the isDefault flag turned off", function() {
			obj.addSingleOption(cleanOptionObj);
			obj.addSingleOption(new KoSelectOption('nameToBeOverwritten', 3, false));
			
			expect(obj()).toEqual(cleanOptionObj.val);
		});
		
		it("should make the observable equal to the val when an array is loaded with an option that has the isDefault flag set", function ()
		{
			obj.appendArray(cleanOptionArray);
			
			expect(obj()).toEqual(cleanOptionArray[1].val);
		});
		
		it("should change the observable equal to the val with there is already a default and an array with another option with the isDefault flag set", function () {
			obj.appendArray([new KoSelectOption('nameToBeOverwritten', 3, true)]);
			obj.appendArray(cleanOptionArray);
			
			expect(obj()).toEqual(cleanOptionArray[1].val);
		});
		
		it("should leave the value of the observable if an array with an option is added with the isDefault flag turned off", function() {
			obj.appendArray(cleanOptionArray);
			obj.appendArray([new KoSelectOption('nameToBeOverwritten', 3, false)]);
			
			expect(obj()).toEqual(cleanOptionArray[1].val);
		});
	});
	
	describe("Callback functionality tests", function (){
		var cleanOptionObj;
		var callBackFixture;
		
		beforeEach(function () {
			cleanOptionObj = new KoSelectOption('name', 1, true);
			callBackFixture = { callback: function () { return; }};	
		});
		
		it("should not attempt to call something that isn't a function passed in as a function", function () {
			var spy = spyOn(callBackFixture, 'callback');
			
			obj.addSingleOption(cleanOptionObj, spy);
			
			expect(spy).toHaveBeenCalled();			
		});
		
		it("should call the callback if it is passed in to the append function", function () {
			var spy = spyOn(callBackFixture, 'callback');
			
			obj.appendArray([cleanOptionObj], spy);
			
			expect(spy).toHaveBeenCalled();
		});
		
		it("should call the callback if it is passed in to the load function", function () {
			var spy = spyOn(callBackFixture, 'callback');
			
			obj.loadArray([cleanOptionObj], spy);
			
			expect(spy).toHaveBeenCalled();
		});
		
		it("should call the callback if it is passed in to the load function", function () {
			var spy = spyOn(callBackFixture, 'callback');
			
			obj.loadArray([cleanOptionObj], spy);
			
			expect(spy).toHaveBeenCalled();
		});
		
		it("should call the callback if it is passed in to the clear function", function () {
			var spy = spyOn(callBackFixture, 'callback');
			
			obj.clearOptions(spy);
			
			expect(spy).toHaveBeenCalled();
		});
	});
});