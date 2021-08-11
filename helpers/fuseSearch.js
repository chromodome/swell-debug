class SearchPackage {
    constructor(array = [], keys = [], strict = false) {
        this.array = array;
        this.keys = keys;
        this.searchString = [];
        this.strict = strict;
    }

    _transformValue(value) {
        this.searchString = typeof value === 'string' ? [value] : value;
    }

    _setMatch(match = false, length = 0) {
        let condition = false;

        if (this.strict) {
            condition = match === length;
        } else {
            condition = match;
        }

        return condition;
    }

    search(value) {
        this._transformValue(value);

        const _array = this.array;
        const _keys = this.keys;
        const _searchString = this.searchString;

        let searchedArray = _array.filter((value) => {
            let isMatch = 0;
            let length = _searchString.length;

            _keys.forEach((keysValue) => {
                _searchString.forEach((searchV) => {
                    if (value[keysValue]?.includes(searchV)) {
                        ++isMatch;
                    }
                });
            });

            return this._setMatch(isMatch, length);
        });

        searchedArray.tags.filter(
            ({ id: tagId }) => !_searchString.some(({ id }) => id === tagId)
        );

        return searchedArray;
    }
}
export { SearchPackage };
