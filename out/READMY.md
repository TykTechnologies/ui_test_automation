# Docs for object wrappers and utils

## Wrapper can be used in automated UI test frameworks.

### Importing wrappers
 #### ui_test_automation can be imported to you framework by adding devDependencies:
```
"ui_test_automation": "git+https://github.com/TykTechnologies/ui_test_automation.git#main"
```
#### to your package.json file.

#### Import proper module into POM class:

```
var Table_object = require('ui_test_automation/wrappers/Table_object');
```

#### Set property in POM class as wrapper object:
```
get API_TABLE() {return new Table_object('.tyk-table');}
```

#### Now you can use wrapper methods in your tests:
```
policies_page.API_TABLE.getRowCount();
```