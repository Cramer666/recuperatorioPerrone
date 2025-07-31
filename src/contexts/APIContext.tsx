import React from 'react';
import api from '../api/digimon.api';
import type { APIContextValues } from './APIContextValues';

const APIContext: React.Context<APIContextValues> = React.createContext<APIContextValues>({ digimon: api.digimon });

export default APIContext;
