import { createContext, useMemo, useReducer } from 'react';
import { initStateSearch, search } from './search.reducer';

const combineReducers = (slices) => (state, action) =>
    Object.keys(slices).reduce(
        (acc, prop) => ({
            ...acc,
            [prop]: slices[prop](acc[prop], action)
        }),
        state
    );

const initState = { search: initStateSearch };

const rootReducer = combineReducers({
    search
});

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initState);

    const store = useMemo(() => [state, dispatch], [state]);

    //console.log(store[0].search);

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

const StoreContext = createContext(initState);

export { StoreContext, StoreProvider };
