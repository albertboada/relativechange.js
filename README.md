RelativeChange.js
======================

Javascript library for calculating relative quantity changes, such as:
```
50  => 200 = 3     (+300%) (x4)
200 => 50  = -0.75 (-75%)  (x0.25)
```
### Demo
[Click here for a demo](http://albertboada.github.io/relativechange.js/demo/index.html)

### Example of Usage
```js
var initial_quantity = 50,
    final_quantity   = 200;
    
var relchange_instance = RelativeChange.Raw.calculate(initial_quantity, final_quantity);
var relchange = relchange_instance.val(); // 3

// Feeling like some convertions
var percentage_instance = relchange_instance.percentage();
var percentage = relchangepercentage_instance.val(); // 300 (+300%)
var multiplier_instance = relchange_instance.multiplier();
var multiplier = multiplier_instance.val(); // 4 (x4)
```

### API
#### `RelativeChange.Raw` constructors
All constructors return instance of `RelativeChange.Raw`

- `calculate(/*Number */initial_quantity, /*Number */final_quantity)`
- `fromRaw(/*Number */relchange)`
- `fromPercentage(/*Number */percentage)`
- `fromMultiplier(/*Number */multiplier)`

#### `RelativeChange.Raw` instance methods
- `val()` @returns instance of `Number`
- `percentage()` @returns instance of `RelativeChange.Percentage`
- `multiplier()` @returns instance of `RelativeChange.Multiplier`

#### `RelativeChange.Percentage` constructors
All constructors return instance of `RelativeChange.Percentage`

- `calculate(/*Number */initial_quantity, /*Number */final_quantity)`
- `fromRaw(/*Number */relchange)`
- `fromPercentage(/*Number */percentage)`
- `fromMultiplier(/*Number */multiplier)`

#### `RelativeChange.Percentage` instance methods
- `val()` @returns instance of `Number`
- `raw()` @returns instance of `RelativeChange.Raw`
- `multiplier()` @returns instance of `RelativeChange.Multiplier`

#### `RelativeChange.Multiplier` constructors
All constructors return instance of `RelativeChange.Multiplier`

- `calculate(/*Number */initial_quantity, /*Number */final_quantity)`
- `fromRaw(/*Number */relchange)`
- `fromPercentage(/*Number */percentage)`
- `fromMultiplier(/*Number */multiplier)`

#### `RelativeChange.Multiplier` instance methods
- `val()` @returns instance of `Number`
- `raw()` @returns instance of `RelativeChange.Raw`
- `percentage()` @returns instance of `RelativeChange.Percentage`
