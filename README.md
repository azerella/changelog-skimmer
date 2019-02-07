# changelog-skimmer
> 📝 Given a common changelog layout, generate a summarised alternative.

Changelog skimmer takes a generic format changelog file path or changelog file data and compacts it into a short list. The output list will contain the version entry and **first** comment for that entry.

# Install
```bash
# NPM
npm i -D changelog-skimmer

# Yarn
yarn add --dev changelog-skimmer
```

# Usage
## Module
```javascript
const { GenerateChangelogSkim } = require( 'changelog-skimmer' );

let changelog = `;
  ## 15.5.1

  ### SUB-HEADING ( Category )
  - Item 1
  - Item 2

  ## 15.5.0

  ### SUB-HEADING ( Category )
  - Item 6
  - Item 2

  ### SUB-HEADING ( Category )
  - Item 7
  - Item 14`

(async () => {
  let output = await GenerateChangelogSkim( changelog );
  
  console.log( output );
})();
```

### Yields
```bash
## 15.5.1

- Item 1

## 15.5.0

- Item 6
- Item 7
```

# Tests
```node
# NPM
npm test

# Yarn
yarn test
```

# Contributors
<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="64" height="64" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>
