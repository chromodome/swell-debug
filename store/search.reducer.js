import { fuseSearch } from '@/helpers/fuseSearch';
import Fuse from 'fuse.js';

const initStateSearch = {
    tags: [],
    selectedTags: [],
    experiences: [],
    filteredExperiences: [],
    tagsShown: []
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
    const parsedValue = values.join(' | ');

    let nexExp = fuseSearch(data, argSearching, {
        useExtendedSearch: true
    }).search(parsedValue);

    nexExp = nexExp.map((experience) => experience.item);

    return nexExp;
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
            let selectedTags = action.payload;
            let hasSelectedTag = false;
            if (state.selectedTags.length > 0) {
                hasSelectedTag = state.selectedTags.some(
                    ({ id }) => id === selectedTags.id
                );
            }

            if (hasSelectedTag) {
                return state;
            }

            return {
                ...state,
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
            const isEmptySelected = selectedTags.length === 0;

            return {
                ...state,
                selectedTags,
                ...(isEmptySelected && {
                    filteredExperiences: state.experiences
                })
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

            if (selectedTags.length === 0) {
                return { ...state, filteredExperiences: [] };
            }

            let tags = selectedTags.map((tag) => {
                return [...tag.related, tag.name];
            });

            let joined = mergedArray(tags);

            let uniqTags = getUnique(joined);

            let filteredExperiences = searchByMultipleValues(
                uniqTags,
                experiences,
                ['tags', 'name']
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

        case 'changeShownTags': {
            let tagsShown = fuseSearch(state.tags, ['name', 'related']).search(
                action.payload
            );

            // tagsShown = tagsShown.filter(
            //     ({ item: { id: itemId } }) =>
            //         !state.selectedTags.some(({ id }) => id === itemId)
            // );

            tagsShown.sort(function (a, b) {
                let nameA = a.item.name.toUpperCase();
                let nameB = b.item.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            return {
                ...state,
                tagsShown: tagsShown
            };
        }

        case 'setShownTags': {
            return {
                ...state,
                tagsShown: action.payload
            };
        }

        case 'setSelectedTags': {
            return {
                ...state,
                selectedTags: action.payload
            };
        }
    }
}

export { initStateSearch, search };
