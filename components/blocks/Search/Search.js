import { memo, useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import translations from '@/constants/translations';
import { handleRowReverse } from '@/helpers/FEutils';
import IconsLucide from '@/blocks/Icon/IconsLucide';
import { StoreContext } from '../../../store-context';
import useComponentVisible from '../../../hooks/useComponentVisible';
import Autocomplete from './Autocomplete';
import { SearchPackage } from '@/helpers/fuseSearch';

function Search({ lang = 'en', rtl }) {
    const router = useRouter();
    const searchPageHref = '/experiences/search';
    const isSearchPage = router.pathname === searchPageHref;

    const [{ search }, dispatch] = useContext(StoreContext);

    const { tags, selectedTags, tagsShown } = search;

    const [value, setValue] = useState('');

    // work with autocomplete element
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible();

    const searchTags = new SearchPackage(tags, ['name', 'related']);

    const handleChangeSearch = (v) => {
        dispatch({ type: 'changeShownTags', payload: v });
        setValue(v);
        setIsComponentVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsComponentVisible(false);

        if (!value) return false;

        const findedTags = searchTags.search(value);

        await dispatch({ type: 'setSelectedTags', payload: findedTags });
        await dispatch({ type: 'searchExperiences' });

        if (!isSearchPage) {
            router.push(searchPageHref);
        }
    };

    // Clear search input value by btn
    const handleClear = () => {
        dispatch({ type: 'setShownTags', payload: [] });
        setIsComponentVisible(false);
        setValue('');
    };

    // select tag from dropdown
    const onSelectTag = async (tag) => {
        await dispatch({ type: 'selectTag', payload: tag });
        await dispatch({ type: 'searchExperiences' });
    };

    const availableTags = useMemo(() => {
        let filteredTags = [];

        filteredTags = tagsShown.filter(
            ({ id: tagId }) => !selectedTags.some(({ id }) => id === tagId)
        );

        return filteredTags;
    }, [tagsShown, selectedTags]);

    const searchInputOnFocus = () => setIsComponentVisible(true);

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
                    onFocus={searchInputOnFocus}
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
            <Autocomplete
                value={value}
                tagsShown={tagsShown}
                isComponentVisible={isComponentVisible}
                availableTags={availableTags}
                onSelectTag={onSelectTag}
            />
        </div>
    );
}

export default memo(Search);
