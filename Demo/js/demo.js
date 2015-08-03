var vm = {
	talkingLabel: ko.observable('I have a feeling like I\'m about to be bound using KOSelectSugar!'),
	selectedValue: ko.observable(1).KoSelectObservable(),
	userOptions: ko.observableArray([new KoSelectOption('I\'m a KoSelectSugar option!', 1, true)]),
};

ko.applyBindings(vm);
							
function loadOptionsIndividually()
{
	for (var option in vm.userOptions())
		vm.selectedValue.appendSingleOption(vm.userOptions()[option], function() {vm.talkingLabel('Can you beleive I just appended all those options to the end of this select here individually?')});
}

function loadOptionsArray()
{
	vm.selectedValue.loadArray(vm.userOptions(), function () {vm.talkingLabel('Oh man, those options down there totally just got loaded all at once as array!')});
}

function clearOptions()
{
	vm.selectedValue.clearOptions(function () {vm.talkingLabel('So you just cleared my options, pretty sweet huh?')});
}

function addUserOption()
{
	vm.userOptions.push(new KoSelectOption());
}

function deleteUserOption(optionToRemove)
{
	vm.userOptions.remove(ko.dataFor(optionToRemove));
}
