import Hive from "./Hive";

interface Props {
    setInput: any;
    letters: string[];
    centerLetter: string;
    answersListExpanded: boolean;
}

const HiveContainer = ({ setInput, letters, centerLetter }: Props) => {
    return <Hive setInput={setInput} letters={letters} centerLetter={centerLetter} />
};

export default HiveContainer;