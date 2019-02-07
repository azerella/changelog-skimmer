'use-strict';

const ChangelogParser = require('changelog-parser')
const Fsp = require( 'fs' ).promises

/**
 * Parse the changelog body per version heading.
 * @param {Array} groupArray - Changelog item elements
 */
const PrintItems = ( groupArray ) => {
    let items = [];
    // Split on subheadings 
    let split = groupArray.body.split( /### .+?\n- / );

    // Remove empty entries
    // @todo - Improve expression to not yield empty items
    let cleanSplitItems = split.filter( item => item !== '' );

    cleanSplitItems.forEach( item => {
        items.push( `- ${ item.match( /.+(?=\n(\-))/g ) }\n` );
    });

    return items.join('');
};


/**
 * Return a string to write to a skimmed verison of a given changlog.
 * For each version and sub-heading, output the first item per sub-heading.
 * 
 * @param {string} filePath - File location of changelog file.
 * @param {string} fileData? - File contents of changelog file. Optional.
 */
const GenerateChangelogSkim = async ( filePath ) => {
    if( await Fsp.readFile( filePath, `utf-8` ) === `` ) { 
        throw Error( `Changelog is empty ?` ) 
    };

    let changelog = await ChangelogParser( filePath );
    let firstVersion = changelog[ `versions` ][ 0 ].version
    let result = ``;

    changelog[ `versions` ].forEach( group => {
        let version = group.version;

        result += `${ ( Object.values( group )[ 0 ]  === firstVersion ) 
            ? `## ${ version }` 
            : `\n## ${ version }` }\n${ PrintItems( group ) }`;
    });

    return result.trim();
};


module.exports.GenerateChangelogSkim = GenerateChangelogSkim;