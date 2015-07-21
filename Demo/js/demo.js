var vm = {
	selectedValue: ko.observable(1).KoSelectObservable()
};

ko.applyBindings(vm);

var defaultOptionsArray = [new KoSelectOption('1. I Got Loaded As Part Of An Array', 1, false)
							, new KoSelectOption('2. I Got Loaded As Part Of An Array', 2, false)
							, new KoSelectOption('3. I Got Loaded As Part Of An Array', 3, true)]
							
function loadDefaultOptionsIndividually()
{
	loadIndividualOption(new KoSelectOption('1. I Got Loaded Individually', 1, false));
	loadIndividualOption(new KoSelectOption('2. I Got Loaded Individually', 2, true));
	loadIndividualOption(new KoSelectOption('3. I Got Loaded Individually', 3, false));
}

function loadIndividualOption(option)
{
	vm.selectedValue.addSingleOption(option);
}

function loadDefaultOptionsArray()
{
	loadArrayOfOptions(defaultOptionsArray);
}

function loadArrayOfOptions(options)
{
	vm.selectedValue.loadArray(options);
}

function clearOptions()
{
	vm.selectedValue.clearOptions();
}
