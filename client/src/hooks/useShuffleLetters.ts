
import { useSetRecoilState } from 'recoil';
import { lettersAtom } from '../state';

export const useShuffleLetters = () => {
    const updateLetters = useSetRecoilState(lettersAtom);

    // Taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array: string[]): string[] {
        let currentIndex = array.length, randomIndex;

        // Copy array
        const _array = [...array];
  
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [_array[currentIndex], _array[randomIndex]] = [_array[randomIndex], _array[currentIndex]];
    }
  
    return _array;
  }

    return () => {
        updateLetters(prevState => shuffleArray(prevState));
    };
};