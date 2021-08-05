import Fuse from 'fuse.js';

/**
 *
 * @param {[]} array
 * @param {string[]} keys
 * @returns
 */
const fuseSearch = (array, keys) =>
    new Fuse(array, {
        includeScore: true,
        shouldSort: true,
        keys,
        threshold: 0
    });

export { fuseSearch };
