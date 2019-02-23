# changelog-skimmer

> 📝 Given a common changelog layout, generate a summarised alternative.

I'm aspiring to make open-source my full-time work. If you like the work that I do, please consider supporting me.

[![Coffee][badge_coffee_donate]](https://www.buymeacoffee.com/adamzerella)
[![PayPal][badge_paypal_donate]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=G6XEP92DGG63S&currency_code=AUD&source=url)

## Install

```bash
npm i changelog-skimmer
```

## Usage

Given a [generic format changelog file](https://www.npmjs.com/package/changelog-parser), compact it into a short or 'skimmed' list. The output will contain the version entry and **first** comment for said entry.

### Module

```javascript
const { GenerateChangelogSkim } = require( 'changelog-skimmer' );

let changelog = `;
  ## 15.5.1

  ### Security
  - Resolved issue in react-scripts
  - Added XSS to page headers

  ## 15.5.0

  ### UI
  - Shrunk icon size
  - Added footer link

  ### Other
  - Bumped package dependencies
  - Added files key to package.json
`

(async () => {
  let output = await GenerateChangelogSkim( changelog );
  
  console.log( output );
})();
```

## Output

```bash
## 15.5.1

- Resolved issue in react-scripts

## 15.5.0

- Shrunk icon size
- Bumped package dependencies
```

## Test

```bash
npm test
```

## Contribute

Don't be scared raise an issue or a pull request! Any contributions, no matter how big or small will land your picture here.

<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="64" height="64" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>

[badge_coffee_donate]: https://adamzerella.com/badges/coffee.svg
[badge_patreon_donate]: https://adamzerella.com/badges/patreon.svg
[badge_paypal_donate]: https://adamzerella.com/badges/paypal.svg