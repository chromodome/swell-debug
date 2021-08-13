class SearchPackage {
    constructor(array = [], keys = [], strict = false) {
        this.array = array;
        this.keys = keys;
        this.searchString = [];
        this.strict = strict;
    }

    // transform search string to array
    _transformValue(value) {
        this.searchString = typeof value === 'string' ? [value] : value;
    }

    // filter experience by matching tags
    experienceSearch(value) {
        this._transformValue(value);
        let searchedArray = [];

        const _array = this.array;
        const _searchString = this.searchString;

        for (let dataItem of _array) {
            let searchingTagLength = _searchString.length;
            let matches = 0;

            if (dataItem.tags.length === 0) continue;

            for (let searchItem of _searchString) {
                for (let tagLabel of dataItem.tags) {
                    this._searchIsMatch(tagLabel, searchItem) && ++matches;
                }
            }

            if (
                searchingTagLength === 1
                    ? matches === 1
                    : matches === searchingTagLength
            ) {
                searchedArray.push(dataItem);
            }
        }

        return searchedArray;
    }

    _searchIsMatch(value = '', search = '') {
        if (value.search(search) === 0) return true;

        return false;
    }

    // find all items by one match
    search(value) {
        this._transformValue(value);

        const _array = this.array;
        const _keys = this.keys;
        const _searchString = this.searchString;
        let searchedArray = [];

        for (let dataItem of _array) {
            let isMatch = 0;

            for (let key of _keys) {
                for (let searchValue of _searchString) {
                    const keyTypeString = typeof dataItem[key] === 'string';

                    if (keyTypeString) {
                        this._searchIsMatch(dataItem[key], searchValue) &&
                            ++isMatch;
                    } else {
                        if (dataItem[key].length === 0) continue;

                        for (let dataItemValue of dataItem[key]) {
                            this._searchIsMatch(dataItemValue, searchValue) &&
                                ++isMatch;
                        }
                    }
                }
            }

            if (isMatch) searchedArray.push(dataItem);
        }

        return searchedArray;
    }
}
export { SearchPackage };
