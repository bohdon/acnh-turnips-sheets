const PRICES_START_COL = 3;
const OUTPUT_START_COL = 17;


function calcPatternForSelection() {
  var ranges = SpreadsheetApp.getActiveRangeList().getRanges();
  for (i = 0; i < ranges.length; ++i) {
    var range = ranges[i];
    var sheet = range.getSheet();
    if (sheet.getName() == "This Week") {
      calcPatternForRange(range);
    }
  }
}

function calcPatternForRange(range) {
  for (n = 0; n < range.getNumRows(); ++n)
  {
    var row = range.getRow() + n;
    calcPatternForRow(range.getSheet(), row);
  }
}

function calcPatternForRow(sheet, row) {
  // get all prices, 0 == buy price
  var priceRange = sheet.getRange(row, PRICES_START_COL, 1, 13);
  var prices = priceRange.getValues()[0];

  // convert empty values to NaN
  var sell_prices = [];
  for (i = 0; i < prices.length; ++i) {
    if (prices[i] == "") {
      sell_prices[i] = NaN;
    } else {
      sell_prices[i] = prices[i];
    }
  }
  // duplicate buy price at start of array
  var sell_prices = [sell_prices[0], ...sell_prices];
  var is_first_buy = false;
  var previous_pattern = null;

  // calc possibilities
  Logger.log(sell_prices, is_first_buy, previous_pattern);
  var possibilities = analyze_possibilities(sell_prices, is_first_buy, previous_pattern);
  Logger.log(possibilities);

  var weekPatternMinMax = getPatternMinAndMaxFromPossibilities(possibilities);

  var outputRange = sheet.getRange(row, OUTPUT_START_COL, 1, 3);
  outputRange.setValues([weekPatternMinMax]);
}

function getPatternMinAndMaxFromPossibilities(possibilities) {
  // get fully-matched pattern (if any), week min and max
  var patternName = "";
  var weekMin = "";
  var weekMax = "";

  var patternNames = [];
  for (i = 0; i < possibilities.length; ++i) {
    var pattern = possibilities[i];
    // 4 == All patterns
    if (pattern.pattern_number == 4) {
      // min max will be Infinity, -Infinity if pattern failed to calculate
      // ignore those outputs
      if (pattern.weekGuaranteedMinimum != Infinity) {
        weekMin = pattern.weekGuaranteedMinimum;
      }
      if (pattern.weekMax != -Infinity) {
        weekMax = pattern.weekMax;
      }
    } else {
      if (!patternNames.includes(pattern.pattern_description)) {
        patternNames.push(pattern.pattern_description);
      }
    }
  }

  // if only one pattern, we found a match
  if (patternNames.length == 1) {
    patternName = patternNames[0];
  }

  Logger.log([patternName, weekMin, weekMax]);
  return [patternName, weekMin, weekMax];
}
