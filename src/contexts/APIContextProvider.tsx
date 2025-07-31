import React from 'react';
import APIContext from './APIContext';
import api from '../api/digimon.api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const APIContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <APIContext.Provider
        value={{
            digimon: api.digimon
        }}
    >
        {children}
    </APIContext.Provider>
);

export default APIContextProvider;