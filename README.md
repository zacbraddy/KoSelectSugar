# KoSelectSugar v1.0
KOSelectSugar is a Knockout.js plugin which allows for lazy loading of select options from sources outside of the original viewmodel at anytime after the model has been bound to the DOM. It means you can bind now to your select DOM object and worry about what you are actually going to load into it later.

### The problem that KoSelectSugarSolves

KoSelectSugar provides a way in which we can load these options into a single observable, have them bind to a select, and only keep track of the selected value because, after all, in most cases that's all we care about! On top of that it provides a way that we can bind a select option and worry about what we are going to load into it later in the process which can be relevant for using select options in SPAs.

###Usage

Of course all the functionality of KoSelectSugar is demonstraterd in the Demo\Demo.html file if you prefer to learn by seeing it in use or else you can find below the API explained.

To install KoSelectSugar on your website just download the zip of this repo and grab out either the ko.selectSugar.js or ko.selectSugar.min.js files and include it in your website along with a script tag on the pages you want to use the functionality on.

To make an observable a KoSelectSugar bindable observable you need to add the KoSelectObservable() function call to the end of the ko.observable like so:

```
var vm = {
  selectedValue: ko.observable().KoSelectObservable()
};
```

Once an observable has been flagged as being a KoSelectObservable in the viewmodel you are now ready to bind the observable to a select DOM object like so:

```
<select data-bind="KoSelect: selectedValue"></select>
```

Now all that is left is to call your standard ko.applyBindings() and your select is ready to go. 

###KoSelectOption

Later on in the lifecycle you are going to want to load options into your KoSelectSugar object. Is to contruct yourself a new KoSelectOption object to load into your KoSelectSugar object. You can do this by either calling the KoSelectOption constructor with no parameter values and you will get an empty object or you might prefer to initialise the option object by passing in the name, value and isdefault parameters:

```
var newEmptyOption = new KoSelectOption();
var newPopulatedOption = new KoSelectOption('Option 1', 1, false);
```

As for those parameters they are defined as follows:
- *name* - The value that will be displayed to the user for this option.
- *value* - The value that will be stored in the KoSelectObservable if this option is selected
- *isDefault* - upon binding this option will be the one that is automatically selected.

###appendSingleOption()

Once you have a KoSelectOption object its time to load it into the KoSelectObservable object. To do this you can call the appendSingleOption function passing in the option object. You may also optionally pass in a call back function which will be called once the option has been added to the KoSelectObservable. If the object passed in as an option does not meet the KoSelectOption schema then an empty KoSelectOption value will be added instead and the callback will be called regardless.

```
vm.selectedValue.appendSingleOption(new KoSelectOption('Option 1', 1, false), function() { alert('Option added!'); });
```

###clearOptions()

If you would like to clear out all the options in a KoSelectObservable you can do this by calling its clearOptions function. This function can optionally be passed a callback function which will be called once the options have been successfully cleared.

```
vm.selectedValue.clearOption(function() { alert('All options have been cleared'); });
```

###appendArray()

The appendArray function takes an array of KoSelectOptions and appends them all to the KoSelectObservable's options list. It can also optionally take a callback function that it will call once the options have been added. If any of the objects in the array do not conform with the KoSelectOption object schema then a blank option will be added in it's place and the callback function will still be called regardless.

```
vm.selectedValue.appendArray([new KoSelectOption('Option 1', 1, false)], function () { alert('Array appended!'); });
```

###loadArray()

The loadArray function also takes an array of KoSelectOptions but before it loads them into the KoSelectObservable's option list it calls the clearOptions function. So this function is sort of an "overwrite with array" sort of function. This function also optionally takes a callback which will be called at the end of it's execution.

```
vm.selectedValue.loadArray([new KoSelectOption('Option 1', 1, false)], function () { alert('Array appended!'); });
```

**Author**: Zac Braddy

**Email**: zacharybraddy.at.gmail.com

**LinkedIn**: [https://uk.linkedin.com/pub/zac-braddy/22/81b/17a]
