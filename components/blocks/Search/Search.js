import { memo, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import translations from '@/constants/translations';
import { handleRowReverse } from '@/helpers/FEutils';
import IconsLucide from '@/blocks/Icon/IconsLucide';
import { StoreContext } from '../../../store';
import { fuseSearch } from '@/helpers/fuseSearch';
import useComponentVisible from '../../../hooks/useComponentVisible';

function Search({ lang = 'en', rtl }) {
    const router = useRouter();
    const searchPageHref = '/experiences/search';
    const isSearchPage = router.pathname === searchPageHref;

    const [{ search }, dispatch] = useContext(StoreContext);

    const { tags, selectedTags } = search;

    const [value, setValue] = useState('');
    const [tagsShown, setTagsShown] = useState([]);

    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible();

    const findTags = (tags, value) => {
        return fuseSearch(tags, ['related', 'name']).search(value);
    };

    useEffect(() => {
        let tagsShown = findTags(tags, value);

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

        setTagsShown(tagsShown);

        if (value === '') setIsComponentVisible(false);
    }, [tags, value]);

    const handleChangeSearch = (v) => {
        setValue(v);
        setIsComponentVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsComponentVisible(false);

        const joinedTagsArray = tags.concat(selectedTags);

        const findedTags = findTags(joinedTagsArray, value);

        await dispatch({
            type: 'searchTagsByValue',
            payload: { findedTags, joinedTagsArray }
        });

        await dispatch({
            type: 'searchExperiences'
        });

        if (!isSearchPage) {
            router.push(searchPageHref);
        }
    };

    const handleClear = () => {
        setIsComponentVisible(false);
        setTagsShown([]);
        setValue('');
    };

    const onSelectTag = async (tag) => {
        await dispatch({ type: 'selectTag', payload: tag });

        const updatedShownTags = tagsShown.filter(
            (value) => value.item.id !== tag.id
        );

        setTagsShown(updatedShownTags);

        await dispatch({ type: 'searchExperiences' });
    };

    return (
        <div className="hidden md:block md:flex-1 mx-8 relative" ref={ref}>
            <form onSubmit={handleSubmit}>
                <input
                    className={`text-sm focus:outline-none rounded-full w-full border-2 border-kn-primary-200 h-12 px-8 ${
                        handleRowReverse(rtl).rtl
                    }`}
                    type="text"
                    value={value}
                    onChange={(e) => handleChangeSearch(e.target.value)}
                    placeholder="Find your experience..."
                />
            </form>
            <div
                onClick={handleClear}
                className={`cursor-pointer focus:outline-none rounded-full bg-green-100 hover:bg-green-200
                text-green-600 hover:text-green-800 absolute top-1/2 -translate-y-1/2 right-0  transform-gpu transition-all duration-300 ease-in-out ${
                    value
                        ? '-translate-x-24 opacity-100'
                        : '-translate-x-2 opacity-0'
                } w-8 h-8 flex items-center justify-center`}>
                <span className="">
                    <IconsLucide icon="X" size={14} />
                </span>
            </div>
            <span
                onClick={handleSubmit}
                className={`cursor-pointer rounded-full bg-green-400 absolute right-2 top-1/2 -translate-y-1/2 duration-300 ease-in-out transform-gpu transition-all ${
                    value ? 'w-20' : 'w-8'
                } h-8 flex items-center justify-center`}>
                <span className="text-gray-800">
                    <IconsLucide icon="Search" size={18} />
                </span>
            </span>

            <ul
                className={`mt-1 transition-all duration-300 ease-in-out absolute 
                w-full border-2 rounded-tl-3xl rounded-bl-3xl border-kn-primary-200 
                bg-white shadow-cards-top md:shadow-cards py-1  ${
                    isComponentVisible
                        ? 'opacity-1 overflow-y-auto max-h-72 '
                        : 'opacity-0 '
                }`}>
                {tagsShown.length > 0 &&
                    isComponentVisible &&
                    tagsShown.map((value) => {
                        return (
                            <li
                                onClick={() => onSelectTag(value.item)}
                                className="cursor-pointer px-8 py-3 capitalize rounded-3xl 
                            hover:bg-kn-primary-100"
                                key={value.item.id}>
                                {value.item.name}
                            </li>
                        );
                    })}
                {tagsShown.length === 0 &&
                    value.length > 0 &&
                    isComponentVisible && (
                        <div className="px-8 py-2">Didn't find any tags</div>
                    )}
            </ul>
        </div>
    );
}

export default memo(Search);
