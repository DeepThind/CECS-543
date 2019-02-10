/**
 * Imports
 */
const fs = require('fs')

/**This is a manifest object contains information related the distribution of artifacts of each files.*/
class Manifest {

    /**
     * A default constructor 
     * @param {string} path 
     */
    constructor(path) {
        if (isString(path)) {
            this._path = path;
            this._content = {};
        } else {
            throw new Error('Path must be a string.')
        }

    }

    /**
     * Getter for path
     */
    get path() {
        return this._path;
    }

    /**
     * Setter for path
     */
    set path(input) {
        this._path = input;
    }

    /**
     * Get the content of this manifest. 
     */
    get content() {
        return JSON.parse(JSON.stringify(this._content));
    }

    /**
     * Create a new entry in the manifest with a given array of artifacts.
     * If entry already exists, its artifacts will be overwritten by a given array of artifacts.
     * by the new
     * @param {string | number} id 
     * @param {array} artifacts 
     */
    createEntry(id, artifacts) {
        if ((isString(id) || isNumber(id)) && isArray(artifacts)) {
            if (this._content[id] === undefined) {
                this._content[id] = [];
            }
            this._content[id] = artifacts;
        } else {
            throw new Error("Invalid inputs detected.");
        }
    }

    /**
     * Remove an existing entry from the manifest.
     * @param {string | number} id 
     */
    removeEntry(id) {
        if (isString(id) || isNumber(id)) {
            if (this._content[id] != undefined) {
                delete this._content[id];
            }
        } else {
            throw new Error("Invalid inputs detected.");
        }
    }

    /**
     * Add an array of artifacts to an entry in the manifest.
     * If no entry existed, new entry will be create.
     * @param {string | number} id 
     * @param {array} artifacts 
     */
    addArtifactsToEntry(id, artifacts) {
        if ((isString(id) || isNumber(id)) && isArray(artifacts)) {
            if (this._content[id] === undefined) {
                this._content[id] = [];
            }
            artifacts.forEach((value) => {
                this._content[id].push(value);
            })

        } else {
            throw new Error("Invalid inputs detected.");
        }
    }

    /**
     * Remove an array of artifacts from an entry in the manifest
     * @param {string | number} id 
     * @param {array} artifacts 
     */
    removeArtifactsFromEntry(id, artifacts) {
        if ((isString(id) || isNumber(id)) && isArray(artifacts)) {
            artifacts.forEach((value) => {
                this.removeArtifactFromEntry(id, value);
            })
        } else {
            throw new Error("Invalid inputs detected.");
        }
    }

    /**
     * Add a single artifact to an entry in the manifest.
     * @param {string | number} id 
     * @param {string | number} artifact 
     */
    addArtifactToEntry(id, artifact) {
        if ((isString(id) || isNumber(id)) && (isString(artifact) || isNumber(artifact))) {
            if (this._content[id] === undefined) {
                this._content[id] = [];
            }
            this._content[id].push(artifact);
        } else {
            throw new Error("Invalid inputs detected.");
        }
    }

    /**
     * Remove a single artifact from an entry in the manifest.
     * @param {string | number} id 
     * @param {string | number} artifact 
     */
    removeArtifactFromEntry(id, artifact) {
        if ((isString(id) || isNumber(id)) && (isString(artifact) || isNumber(artifact))) {
            if (this._content[id] != undefined) {
                let index = this._content[id].indexOf(artifact);
                if (index > -1) {
                    this._content[id].splice(index, 1);
                }
            }
        } else {
            throw new Error("Invalid inputs detected.");
        }

    }

}

/**
 * A synchronous reading of the JSON formatted file.  
 * @param {string} filePath 
 */
function readFromFile(filePath) {
    let content = fs.readFileSync(filePath);
    return JSON.parse(content);
}

/**
 * An asynchronous writing of an object into a file.
 * @param {string} filePath 
 * @param {object} object 
 */
function writeToFile(filePath, object) {
    fs.writeFile(filePath, JSON.stringify(object), (err) => {
        console.log(err);
    })
}

/**
 * Check if the input is a string.
 * @param {*} input 
 */
function isString(input) {
    if (typeof input === 'string' || input instanceof String) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if the input is a number.
 * @param {*} input 
 */
function isNumber(input) {
    if (typeof input === 'number' || input instanceof Number) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if the input is an array.
 * @param {*} input 
 */
function isArray(input) {
    if (Array.isArray(input)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Expose the manifest class for external usage. 
 */
module.exports = Manifest;