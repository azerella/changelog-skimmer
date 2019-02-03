'use-strict';

const Fsp = require( 'fs' ).promises;

/**
 * 
 * @param {string} filePath - File location of changelog file.
 * @param {string} fileData? - File contents of changelog file. Optional.
 */
const GenerateChangelogSkim = async ( filePath, fileData ) => {
    if ( filePath && fileData ) {
        throw new Error( `Please provide either a filepath or the file data.` );
    }

    let content = "";

    if ( fileData ) {
        content = fileData
    }
    else if ( filePath ) {
        content = await Fsp.readFile( filePath, `utf-8` );
    }
    else {
        return "";
    }
    
    return content;
};

(async () => {
    let file = await Fsp.readFile( `_fixture.md`, `utf-8` );

    // Expression to match all possible version codes given semver syntax.
    let versionExpression = /## \d*\.?\d*\.?\d+$/g;
    // Array containing all versions given a changelog file
    let versionMatchesArray = file.match( versionExpression );


    // Expression to match all possible sub-headings
    let subHeadingExpression = /### .*$/gm;
    // Array containing all sub-headings given a changelog file
    let subHeadingArray = file.match( subHeadingExpression );


    // Expression to match all possible line items
    let lineItemExpression = /- .+$/gm;
    // Array containing all line items given a changelog file
    let lineItemArray = file.match( lineItemExpression );

    // let test = [ ...versionMatchesArray, ...subHeadingArray, ...lineItemArray ];
    // console.log( test );

    //Match all before next version 
    // console.log( file.match( /(## \d*\.?\d*\.?\d+).*(?=## \d*\.?\d*\.?\d+)/sgm ) );

})();

module.exports.GenerateChangelogSkim = GenerateChangelogSkim;