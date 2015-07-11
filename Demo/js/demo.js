var vm = {
	selectedValue: ko.observable(1).KoSelectObservable()
};

ko.applyBindings(vm);

vm.selectedValue.addSingleOption(new KoSelectOption("Test1", 1, false))
vm.selectedValue.addSingleOption(new KoSelectOption("Test2", 2, true))
vm.selectedValue.addSingleOption(new KoSelectOption("Test3", 3, false))

