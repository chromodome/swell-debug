import Fuse from 'fuse.js';

const fuseSearch = (allTags, keys) =>
    new Fuse(allTags, {
        includeScore: true,
        shouldSort: true,
        keys,
        threshold: 0
    });

export { fuseSearch };
