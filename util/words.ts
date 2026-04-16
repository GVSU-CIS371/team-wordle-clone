import { list } from './word_list.ts'
import seedrandom from 'seedrandom'

const getWord = (date: string): string => {
    return list[Math.floor((Number(seedrandom(date))))*list.length]!;
};

export default getWord;