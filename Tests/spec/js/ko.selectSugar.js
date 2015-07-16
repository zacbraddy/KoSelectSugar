describe("KoSelectOption", function ()
{
	it("should initialise all members to null if no parameters are passed to the constructor", function () {
		var obj = new KoSelectOption();
		
		expect(obj.name).not.toBeUndefined();
		expect(obj.val).not.toBeUndefined();
		expect(obj.defaultSelected).not.toBeUndefined();
		expect(obj.name).toBeNull();
		expect(obj.val).toBeNull();
		expect(obj.defaultSelected).toBeNull()
	});
	
	it("should correctly initialise all members with the parameters passed into the constructor", function () {
		var obj = new KoSelectOption('name', 1, true);
		
		expect(obj.name).toEqual('name');
		expect(obj.val).toEqual(1);
		expect(obj.defaultSelected).toBe(true)
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
		
		it("should push a KoSelectOption object onto the optionsList when just an option is passed in", function () {
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj.optionsList().length).toEqual(1);
			expect(obj.optionsList()[0]).toEqual(cleanOptionObj);
		});
		
		it("should push a KoSelectOption object onto the optionsList when the option and the immediate insert flag are passed in", function () {
			obj.addSingleOption(cleanOptionObj);
			
			expect(obj.optionsList().length).toEqual(1);
			expect(obj.optionsList()[0]).toEqual(cleanOptionObj);
		});
		
		it("should not push the option onto the optionsList and simple return the populated object when the immediate insert flag is off", function () {
			var result = obj.addSingleOption(cleanOptionObj, false);
			
			expect(obj.optionsList().length).toEqual(0);
			expect(result).not.toBeUndefined();
			expect(result).toEqual(cleanOptionObj);
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
		
		it("should throw and exception when any malformed object is passed in", function () {
			function container() {
				obj.addSingleOptions({random: 'member'});
			}
			
			expect(container).toThrowError(TypeError);
		});
	});
})