import { useContext } from 'react';

import APIContext from './APIContext';
import type { APIContextValues } from './APIContextValues';

const useAPI = (): APIContextValues => useContext(APIContext);

export default useAPI;
