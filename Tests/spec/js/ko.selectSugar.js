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
	describe("Initialisation", function () {
		it("should initialise with the correct member functions and variables", function () {
			var obj = ko.observable().KoSelectObservable();
			
			expect(obj.optionsList).not.toBeUndefined();
			expect(obj.addSingleOption).not.toBeUndefined();
			expect(ko.isObservable(obj.optionsList)).toBe(true);
			expect(obj.optionsList.destroyAll).not.toBeUndefined();
			expect(typeof(obj.addSingleOption)).toEqual('function')
		})
	});
	
	describe("KoSelectObservable_addSingleOption", function () {
		var obj;
		var cleanOptionObj;
		
		beforeEach(function () {
			obj = ko.observable().KoSelectObservable();
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
	
	describe("KoSelectObservable_loadArray", function () {
		var obj;
		var cleanArray;
		
		beforeEach(function () {
			obj = ko.observable().KoSelectObservable();
			cleanArray = [new KoSelectOption('name1', 1, true), new KoSelectOption('name2', 2, false), new KoSelectOption('name3', 3, false)];
		});
		
		it("should complete without exceptions if no parameters are passed in at all", function () {
			var container = function () {
				obj.loadArray();
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should take an empty array without exceptions", function () {
			var container = function () {
				obj.loadArray([]);
			};
			
			expect(container).not.toThrow();
			expect(obj.optionsList().length).toEqual(0);
		});
		
		it("should throw an error if something that is not an array is passed in", function () {
			var container = function () {
				obj.loadArray('break');	
			}
			
			expect(container).toThrowError(TypeError);
		});
		
		it("should load an array of clean objects", function ()
		{
			obj.loadArray(cleanArray);
			
			expect(obj.optionsList()).not.toBeUndefined();
			expect(obj.optionsList().length).toEqual(3);
			expect(obj.optionsList()[0]).toEqual(cleanArray[0]);
		});
		
		it("should insert all options it can but insert empty objects instead for the malformed objects found in the array", function () {
			var dirtyArray = cleanArray;
			dirtyArray.splice(1, 0, {random: 'member'});
			obj.loadArray(dirtyArray);
				
			expect(obj.optionsList()[0]).toEqual(cleanArray[0]);
			expect(obj.optionsList()[1]).toEqual(new KoSelectOption());
		});
		
		it("should not add properties that aren't part of the KoSelectOption schema", function () {
			var cleanOptionObj = new KoSelectOption('name', 1, true);
			cleanOptionObj.random = 'member';
			
			obj.loadArray([cleanOptionObj]);
			
			expect(obj.optionsList()[0].random).toBeUndefined();
		});
	});
	
	describe("defaulting functionality", function () {
		var obj;
		var cleanOptionObj;
		
		beforeEach(function () {
			obj = ko.observable().KoSelectObservable();
			cleanOptionObj = new KoSelectOption('name', 1, true);
		});
		
		it("should make the observable equal to the val when a single option is added with the isDefault flag set", function ()
		{
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj()).toEqual(cleanOptionObj.val);
		});
	});
});