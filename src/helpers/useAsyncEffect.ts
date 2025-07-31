import { useEffect } from 'react';

type AsyncCallback = () => Promise<void>;
type DependencyList = readonly unknown[];

const useAsyncEffect: (effect: AsyncCallback, deps?: DependencyList) => void = (effect, deps) =>
    useEffect(() => {
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

export default useAsyncEffect;