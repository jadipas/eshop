import React, { createContext, useContext, useReducer } from "react";

//prepares the DataLayer
export const StateContext = createContext();

//wrap our app and provide the DataLayer to every Component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={userReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//pour information from the DataLayer
export const useStateValue = () => useContext(stateContext);