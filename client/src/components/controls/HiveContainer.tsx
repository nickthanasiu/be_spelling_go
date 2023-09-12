import Hive from "./Hive";


interface Props {
    letters: string[];
    centerLetter: string;
    answersListExpanded: boolean;
}

const HiveContainer = ({ letters, centerLetter }: Props) => {
    return <Hive letters={letters} centerLetter={centerLetter} />
};

export default HiveContainer;