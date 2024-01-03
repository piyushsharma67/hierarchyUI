import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeeSlice from './slice/organisationHierarchy.slice'


const reducers = combineReducers({
    employeeSlice
})

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        return undefined;
    }
}

const preloadedState = loadFromLocalStorage()

export type RootState = ReturnType<typeof reducers>;

export const store = configureStore({
    reducer: reducers,
    preloadedState: preloadedState,

})