const { GenerateChangelogSkim } = require(  `./index.js` );

const Expect = require( `chai` ).expect;
const Path = require( `path` );
const Fsp = require( `fs` ).promises;

describe( `GenerateChangelogSkim()`, () => {
    // Fixture filenames
    let fixtStandardFileName = Path.join( __dirname, `fixtStandard.md` );
    let fixtEmptyFileName = Path.join( __dirname, `fixtEmpty.md` );
    let fixtStarItemFileName = Path.join( __dirname, `fixtStarItems.md` );
    let fixtAdvancedFileName = Path.join( __dirname, `fixtAdvanced.md` );

    // Fixture changelogs
    let fixtEmpty = ``;
    let fixtStandard = `## 15.5.1

### SUB-HEADING (Category)
- Item 1
- Item 2

### SUB-HEADING (Category)
- Item 3
- Item 4

## 15.5.0

### SUB-HEADING (Category)
- Item 6
- Item 2

### SUB-HEADING (Category)
- Item 1
- Item 4

### SUB-HEADING (Category)
- Item 7
- Item 14`
let fixtStarItems = `## 15.5.1

### SUB-HEADING (Category)
* Item 1
* Item 2

### SUB-HEADING (Category)
* Item 3
* Item 4

## 15.5.0

### SUB-HEADING (Category)
* Item 6
* Item 2

### SUB-HEADING (Category)
* Item 1
* Item 4
`
let fixtAdvanced = `# changelog title

A cool description (optional).

## unreleased
* foo

## x.y.z - YYYY-MM-DD (or DD.MM.YYYY, D/M/YY, etc.)
* bar

## [a.b.c]

### Changes

* Update API
* Fix bug #1

## 2.2.3-pre.1 - 2013-02-14
* Update API

## 2.0.0-x.7.z.92 - 2013-02-14
* bark bark
* woof
* arf

## v1.3.0

* make it so

## [1.2.3](link)
* init

[a.b.c]: http://altavista.com`

    beforeEach( async () => {
        // Write fixture files after each test is run.
        await Fsp.writeFile( fixtStandardFileName, fixtStandard );
        await Fsp.writeFile( fixtStarItemFileName, fixtStarItems );
        await Fsp.writeFile( fixtEmptyFileName, fixtEmpty );
        await Fsp.writeFile( fixtAdvancedFileName, fixtAdvanced );
    });

    
    afterEach( async () => {
        // Delete fixture files after each test is run.
        await Fsp.unlink( fixtStandardFileName );
        await Fsp.unlink( fixtStarItemFileName );
        await Fsp.unlink( fixtEmptyFileName );
        await Fsp.unlink( fixtAdvancedFileName );
    });
    

    it( `Should return first item per sub-heading given a valid changelog with '-' line items.`, async () => {
        Expect( await GenerateChangelogSkim( fixtStandardFileName ) ).to.equal( `## 15.5.1\n- Item 1\n- Item 3\n\n## 15.5.0\n- Item 6\n- Item 1\n- Item 7` );
    });


    it( `Should return first item per sub-heading given a valid changelog with '*' line items.`, async () => {
        Expect( await GenerateChangelogSkim( fixtStarItemFileName ) ).to.equal( `` );
    });


    it( `Should return first item per sub-heading given a valid complicated changelog.`, async () => {
        Expect( await GenerateChangelogSkim( fixtAdvancedFileName ) ).to.equal( `` );
    });


    it( `Should return an empty string given a empty changelog with.`, async () => {
        try {
            await GenerateChangelogSkim( fixtEmptyFileName );
        }
        catch ( error ) {
            Expect( error.message ).to.equal( `Changelog is empty ?` );
        }
    });


    it( `Should return an ENOENT exception given non-existant file`, async () => {
        try {
            await GenerateChangelogSkim( `/dude-what-is-this-file-path?` );
        }
        catch ( error ) {
            Expect( error.message ).to.equal( `ENOENT: no such file or directory, open \'/dude-what-is-this-file-path?\'` );
        }
    });
});