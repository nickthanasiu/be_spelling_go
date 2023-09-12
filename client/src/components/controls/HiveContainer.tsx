import { useRecoilValue } from "recoil";
import { lettersAtom, centerLetterSelector } from "../../state";
import Hive from "./Hive";

const HiveContainer = () => {
    const letters = useRecoilValue(lettersAtom);
    const centerLetter = useRecoilValue(centerLetterSelector);

    return <Hive letters={letters} centerLetter={centerLetter} />
};

export default HiveContainer;