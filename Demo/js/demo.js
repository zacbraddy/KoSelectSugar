var vm = {
	selectedValue: ko.observable(1).KoSelectObservable()
};

ko.applyBindings(vm);

vm.selectedValue.optionsList.push({name: 'Test', val: 1})

