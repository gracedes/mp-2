 // TODO ideas
 //   - drop-down to filter by first/last game using react hooks
 //   - look into custom hook for array manipulation
 //   - add ability to search

import {useEffect, useState} from "react";
import type {Character} from "../interfaces/Characters.ts";
// import PuyoImage from "../components/PuyoImage.tsx";
import {Games} from "../interfaces/Games.ts";
 import styled from "styled-components";

 const CharsContainer = styled.div`
     display: flex;
     flex-flow: row wrap;
     justify-content: space-evenly;
     background-color: dimgrey;
 `;

 const CharDiv=styled.div<{firstGame: string, lastGame: string}>`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: auto;
    border: 3px darkgray solid;
    border-radius: 15px;
    font: italic small-caps bold calc(2px + 1vw) Arial;
    text-align: center;
     
     background-color: lightcoral;
     background-color: ${(props) => (`rgba(98, 180, 255, ${(Games[props.lastGame] - Games[props.firstGame]) / (2026 - 1989)})`)};
     `;

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
        <CharsContainer>
            {
                characters.map((char: Character) =>
                    <CharDiv firstGame={char.firstAppear !== undefined ? char.firstAppear.split(",")[0] : char.firstAppear} lastGame={char.lastAppear !== undefined ? char.lastAppear.split(",")[0] : char.lastAppear}>
                        <h1>{char.name}</h1>
                        <h2>({char.nameJP.unicode})</h2>
                        <p>Gender: {char.gender}</p>
                        <p>Birthday: {char.birthday}</p>
                        <p>First Appearance: {char.firstAppear !== undefined ? char.firstAppear.split(",")[0] : char.firstAppear}</p>
                        <p>Last Appearance: {char.lastAppear !== undefined ? char.lastAppear.split(",")[0] : char.lastAppear}</p>
                    </CharDiv>
                )
            }
        </CharsContainer>
    );
}
// TODO: parse appearances for sonic
