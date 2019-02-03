# changelog-skimmer
> 📝 Given a common changelog layout, generate a summarised alternative.

Changelog skimmer takes a generic format changelog file path or changelog file data and compacts it into a short list. The output list will contain the version entry and first comment for that version entry.

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

( async () => {
  let changelog = "
    ## 1.1.2

    - Refactored src init script
    - Improved comments

    ## 1.0.1

    - Updated README instructions.
    - Upgraded packages.

    ## 1.0.0

    - Inital commit
  ";

  let output = await GenerateChangelogSkim( changelog );

  console.log( output );
})();
```

### Yields
```bash
  * v1.1.2 - Refactored src init script
  * v1.0.1 - Updated README instructions
  * v1.0.0 - Inital commit
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
