import Fuse from 'fuse.js';

/**
 *
 * @param {[]} array
 * @param {string[]} keys
 * @returns
 */

const fuseSearch = (array, keys, options = {}) =>
    new Fuse(array, {
        keys,
        includeScore: true,
        shouldSort: true,
        threshold: 0,
        ...options
    });
console.log({ fuseSearch, Fuse });
export { fuseSearch };
