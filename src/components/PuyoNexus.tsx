 // TODO ideas
 //   - drop-down to filter by first/last game using react hooks
 //   - look into custom hook for array manipulation
 //   - add ability to search

import {useEffect, useState} from "react";
import type {Character} from "../interfaces/Characters.ts";
import PuyoImage from "../components/PuyoImage.tsx";

export default function PuyoNexusContent(){
    const [characters, setCharacters] = useState<Character[]>([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://deltadex7-puyodb-api-deno-9thxn4rqxy9g.deno.dev/api/v1/characters");
            const rawData = await res.json();
            setCharacters(rawData.data);
        }
        fetchData().then(()=>console.log("okay")).catch((e) => console.log(e));
    }, [characters.length]);

    return (
        <div>
            {
                characters.map((char: Character) =>
                    <div>
                        <h1>{char.name}</h1>
                        <h2>({char.nameJP.unicode})</h2>
                        <PuyoImage char={char}/>
                        <p>Gender: {char.gender}</p>
                        <p>Birthday: {char.birthday}</p>
                        <p>First Appearance: {char.firstAppear}</p>
                        <p>Last Appearance: {char.lastAppear}</p>
                    </div>
                )
            }
        </div>
    );
}
// TODO: parse appearances for sonic
