# KoSelectSugar
A custom knockout binding that you can use as syntactic sugar for your select DOM objects.

KoSelectSugar is a plugin for Knockout.js which was born of a task set upon me in my daily work with Knockout.

### The problem that KOSelectSugarSolves

KoSelectSugar allows for lazy loading of select options from sources outside of the original viewmodel. It provides a way in which we can load these options into a single observable, have them bind to a select, and only keep track of the selected value because, after all, in most cases that's all we care about!

You can see here the very first commit of KoSelectSugar and I have yet to build in a large number of it's core features. I have set myself a release date of the 7th of July, 2015 so please check back if you've found this before then and you are interested in this plugin.

### Todos

~~1. Add a factory function to give out an object to be inserted into the list.~~

~~2. Add an insert function. Make sure that it validates that it has been sent an object of the correct type.~~

~~3. Add a unit testing framework and write a test for the factory method so we can then revert to a TDD model~~

4. Build in a way to have the binding default to a certain selected item and make it so that can be defaulted based on name or value.
5. Build an insert function that can take and array and two parameters for name and tag and allow this function to build and array of input objects, this should work for JSON or other KO viewmodels.
6. Add the ability to pass in a callback.

###Long term todos

1. Minify source
2. Turn this into an npm or bower module?
3. Perhaps add a way to load objects via Ajax.
