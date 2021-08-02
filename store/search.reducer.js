import { fuseSearch } from '@/helpers/fuseSearch';

const initStateSearch = {
    tags: [],
    selectedTags: [],
    experiences: [],
    filteredExperiences: []
};

/**
 * mergedArray
 * @param {arrays [[], [], []]} arrays
 * @returns array: []
 */
const mergedArray = (arrays) => {
    let joined = [];

    arrays.forEach((value) => {
        joined = [...joined, ...value];
    });

    return joined;
};

/**
 * getUnique
 * @param [] array
 * @returns array[]
 */
const getUnique = (array) => Array.from(new Set(array));

/**
 * searchByMultipleValues
 * @param [] values
 * @param [] data
 * @param [] argSearching
 * @return array[]
 */

const searchByMultipleValues = (values, data, argSearching) => {
    let newValues = [];

    values.forEach((value) => {
        const nexExp = fuseSearch(data, argSearching).search(value);

        newValues = [...newValues, ...nexExp.map((value) => value.item)];
    });

    return newValues;
};

function search(state, action) {
    switch (action.type) {
        /**
         * tags: []
         */
        case 'addAllTags': {
            return {
                ...state,
                tags: action.payload
            };
        }
        /**
         * experiences: []
         */
        case 'addAllExperiences': {
            const experiences = action.payload
                ? action.payload
                : state.experiences;

            return {
                ...state,
                experiences: experiences,
                filteredExperiences: experiences
            };
        }
        /**
         * tag: any{}
         */
        case 'selectTag': {
            const selectedTags = action.payload;
            return {
                ...state,
                tags: state.tags.filter(
                    (value) => value.id !== selectedTags.id
                ),
                selectedTags: [...state.selectedTags, selectedTags]
            };
        }
        /**
         * tag: any{}
         */
        case 'removeSelectedTag': {
            const selectedTags = state.selectedTags.filter(
                (value) => value.id !== action.payload.id
            );

            return {
                ...state,
                selectedTags,
                tags: [...state.tags, action.payload]
            };
        }

        case 'clearAllSelectedTags': {
            return {
                ...state,
                tags: [...state.tags, ...state.selectedTags],
                selectedTags: []
            };
        }

        case 'searchExperiences': {
            const { selectedTags, experiences } = state;

            let tags = selectedTags.map((k) => {
                return k.related;
            });

            let joined = mergedArray(tags);

            let uniqTags = getUnique(joined);

            let filteredExperiences = searchByMultipleValues(
                uniqTags,
                experiences,
                ['tags']
            );

            return {
                ...state,
                filteredExperiences
            };
        }

        case 'searchTagsByValue': {
            const { findedTags, joinedTagsArray } = action.payload;
            const clearTags = findedTags.map((key) => key.item);
            let filteredTags = [];

            filteredTags =
                clearTags.length === 0
                    ? joinedTagsArray
                    : state.tags.filter(
                          ({ id: tagId }) =>
                              !clearTags.some(({ id }) => id === tagId)
                      );

            return {
                ...state,
                selectedTags: clearTags,
                tags: filteredTags
            };
        }
    }
}

export { initStateSearch, search };
