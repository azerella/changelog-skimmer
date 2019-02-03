const { GenerateChangelogSkim } = require(  './index.js' );

const Expect = require( 'chai' ).expect;
const Path = require( 'path' );
const Fsp = require( 'fs' ).promises;

describe( 'GenerateChangelogSkim()', () => {
    let fixtureComplex = `## 0.0.42
Authentication:

-   Lowered the resource requirements for the apidocs-server based on data.gov.au usage.

Ops:

-   Allows gateway routes to be overiden from top level values file
-   Added 'enableCkanRedirection' switch to turn on or off Ckan redirection feature from gateway
-   Added 'global.enablePriorityClass' switch to turn on or off 'priorityClassName' on deployment templates
-   Improved responsiveness of registry-api when it's under load
-   Made the content-api accept authentication by default

## 0.0.41

Accessibility:

-   Made the image and the text wrapped in a single link and the set image alt value to null for stories on the home page
-   Made navigation items screen readable by removing unnecessary aria-hidden label from menu
-   Got screen reader to say "Open Data Quality: 3/5 stars" instead of repeating star rating text
-   Stopped tab order reverting to body after tabbing through the search box`;

    let fixtureSimple = `## [1.0.0] - 2017-06-20
### Added
- New visual identity by [@tylerfortune8](https://github.com/tylerfortune8).
- Version navigation.
- Links to latest released version in previous versions.
- "Why keep a changelog?" section.
- "Who needs a changelog?" section.`;

    let fixtureEmpty = ``;

    beforeEach( async () => {
        // Write fixture files after each test is run.
        await Fsp.writeFile( `fixtureComplex.md`, fixtureComplex );
        await Fsp.writeFile( `fixtureSimple.md`, fixtureSimple );
        await Fsp.writeFile( `fixtureEmpty.md`, fixtureEmpty );
    });

    
    afterEach( async () => {
        // Delete fixture files after each test is run.
        await Fsp.unlink( `fixtureComplex.md` );
        await Fsp.unlink( `fixtureSimple.md` );
        await Fsp.unlink( `fixtureEmpty.md` );
    });
    

    it( 'Should return empty string given a empty file', async () => {
        Expect( await GenerateChangelogSkim( fixtureEmpty ) ).to.equal( '' );
    });

    it( 'Should throw if a filepath and file data is provided', async () => {
        Expect( await GenerateChangelogSkim( 'abc', 'def' ) ).to.throw( 'Please provide either a filepath or the file data.' );
    });
    
    it( 'Should return empty string given an empty string', async () => {
        Expect( await GenerateChangelogSkim( `` ) ).to.equal( `` );
    });


    it( 'Should return a Skimmer given a simple changelog file', async () => {
        Expect( await GenerateChangelogSkim( fixtureSimple ) ).to.equal( '' );
    });
    

    it( 'Should return a Skimmer given a complex changelog file', async () => {
        Expect( await GenerateChangelogSkim( fixtureComplex ) ).to.equal( '' );
    });


    it( 'Should return relevant output given changelog file data', async () => {
        Expect( await GenerateChangelogSkim( `## 1.0.1\n\n- Updated README.md\n\n##1.0.0` ) ).to.equal( '' );
    });
});