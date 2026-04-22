import { list } from './word_list.ts';
import seedrandom from 'seedrandom';

const getWord = (date: string): string => {
    const rand: number = Math.floor((seedrandom(date)())*list.length);
    return list[rand] ?? 'Fail';
};

export default getWord;