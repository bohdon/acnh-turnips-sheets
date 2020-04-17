# Animal Crossing New Horizons Turnips Sheets

Google Apps Scripts for auto-calculating turnip price patterns, min, and max as data is entered in Google Sheets.

Predictions are **entirely** copied from the great work done on https://turnipprophet.io/, which is made possible by [Ninji's work](https://twitter.com/_Ninji/status/1244818665851289602?s=20)

![Alt text](/acnh_turnips_sheets.gif)

## Setup

_NOTE: Column names don't matter, just their indexes_

- Make a Google Sheets doc, and name the first sheet `This Week`
- Add columns for prices in this order, starting with **`Sun` at column `C`**

| Sun | Mon | Mon | Tue | Tue | Wed | Wed | Thu | Thu | Fri | Fri | Sat | Sat |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|

- Add columns for output data in this order, starting with **`Pattern` at column `Q`**

| Pattern | Guarant'd Min | Possible Max |
|---------|---------------|--------------|

- Add a script using **Tools > Script editor**
- Make a new script file for each script in this repo, and copy the contents

## Usage

- Enter prices throughout the week, and watch the values appear!
  - `onEdit` is called automatically, and will trigger an update if the edited cell is in the prices range
- Recalculate any selected rows with **Turnips > Calculate Selected Patterns**
- **Pattern** will only be populated if only one matching pattern has been found (later in the week)

## Changing Columns

- Edit the `PRICES_START_COL` and `OUTPUT_START_COL` in [main.gs](/main.gs) to change which ranges to use for prices and output
