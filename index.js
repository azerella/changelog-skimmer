'use-strict';

const Fsp = require( 'fs' ).promises;

/**
 * 
 * @param {string} filePath - File location of changelog file.
 * @param {string} fileData? - File contents of changelog file. Optional.
 */
const GenerateChangelogSummary = async ( filePath, fileData ) => {
    if ( filePath && fileData ) {
        throw `Please provide either a filepath or the file contents.`
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

module.exports.GenerateChangelogSummary = GenerateChangelogSummary;