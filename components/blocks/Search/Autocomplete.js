import React, { memo } from 'react';

function Autocomplete({
    availableTags,
    onSelectTag,
    value,
    isComponentVisible
}) {
    const tagsAutocompleteShowed = value !== '' && isComponentVisible;

    const warnMessageShowed =
        availableTags.length === 0 && tagsAutocompleteShowed;

    if (!tagsAutocompleteShowed) return null;
    return (
        <ul
            className={`mt-1 transition-all duration-300 ease-in-out absolute 
  w-full border-2 rounded-tl-3xl rounded-bl-3xl border-kn-primary-200 
  bg-white shadow-cards-top md:shadow-cards py-1  ${
      tagsAutocompleteShowed
          ? 'opacity-1 overflow-y-auto max-h-72 '
          : 'opacity-0 '
  }`}>
            {availableTags &&
                availableTags.length > 0 &&
                availableTags.map((value) => {
                    return (
                        <li
                            onClick={() => onSelectTag(value)}
                            className="cursor-pointer px-8 py-3 capitalize rounded-3xl 
              hover:bg-kn-primary-100"
                            key={value.id}>
                            {value.name}
                        </li>
                    );
                })}
            {warnMessageShowed && (
                <div className="px-8 py-2">Didn't find any tags</div>
            )}
        </ul>
    );
}

export default memo(Autocomplete);
