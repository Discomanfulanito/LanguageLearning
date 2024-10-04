import { useEffect, useState } from 'react';
import Trie from '/src/logic/TRIE.js'
import { DICTIONARIES_PATH } from '/src/constants.js'

export const useTrie = () => {
    const [trie, setTrie] = useState(null);

    useEffect(() => {
        const initializeTrie = async () => {
            const newtrie = new Trie();
            const dictPath = DICTIONARIES_PATH.spanish

            await newtrie.buildDict(dictPath);
            setTrie(newtrie);
        }
        initializeTrie();
    }, []);

    return { trie }
}