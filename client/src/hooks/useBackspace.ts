import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { inputAtom } from "../state";

export const useBackspace = () => {
    const setInputState = useSetRecoilState(inputAtom);

    const backspace = useCallback(() => {
        setInputState(prevState => [...prevState.slice(0, -1)]);
    }, []);

    return backspace;
};