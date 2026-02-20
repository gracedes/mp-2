import {useEffect, useState} from "react";
import type {Character} from "../interfaces/Characters.ts";
import {Games} from "../interfaces/Games.ts";
 import styled from "styled-components";

 const CharsContainer = styled.div`
     display: flex;
     flex-flow: row wrap;
     justify-content: space-evenly;
     width: 100vw;
 `;

 const CharDiv=styled.div<{firstGame: string, lastGame: string}>`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    width: 30%;
    padding: 2%;
    margin: 1%;
    border: 3px rgb(98, 180, 225) solid;
    border-radius: 15px;
    font: italic small-caps bold calc(2px + 1vw) Arial;
    text-align: center;
     
     box-shadow: 0 0 10px rgb(98, 180, 225);
     background-color: ${(props) => (`rgba(98, 180, 255, ${(Games[props.lastGame] - Games[props.firstGame]) / (1.75 * (2026 - 1989))})`)};
     
    &:hover {
        box-shadow: 0 0 15px rgb(98, 180, 225);
    }
 `;

 const SearchDiv = styled.div`
     text-align: center;
     margin-top: 1vh;
     font: italic small-caps bold calc(2px + 1vw) Arial;
     
     & input {
         border: 3px rgb(98, 180, 225) solid;
         border-radius: 15px;
         box-shadow: 0 0 10px rgb(98, 180, 225);
         width: 96%;
         margin: 2vh 2%;
         padding: 1%;
         
         &:focus {
             box-shadow: 0 0 15px rgb(98, 180, 225);
             outline: none;
         }
     }
 `;

 const MsgDiv = styled.div`
     width: 100vw;
     text-align: center;
     font: italic small-caps bold calc(2px + 1vw) Arial;
 `;

export default function PuyoNexusContent(){
    const [searchText, setSearchText] = useState("");
    const [characters, setCharacters] = useState<Character[]>([])

    // TODO: add catch for no characters

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://deltadex7-puyodb-api-deno-9thxn4rqxy9g.deno.dev/api/v1/characters/${searchText}`);
            const rawData = await res.json();
            setCharacters(rawData.data);
        }
        fetchData().then(()=>console.log("okay")).catch((e) => console.log(e));
    }, [characters, searchText]);

    if (!characters) {
        if (searchText === "") return (
            <>
                <SearchDiv>
                    <h1>Puyo Puyo Characters</h1>
                    <input type={"text"} id={"charSearch"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
                </SearchDiv>
                <MsgDiv><h1>Loading...</h1></MsgDiv>
            </>
        )
        else return (
            <>
                <SearchDiv>
                    <h1>Puyo Puyo Characters</h1>
                    <input type={"text"} id={"charSearch"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
                </SearchDiv>
                <MsgDiv><h1>No characters match your search! :(</h1></MsgDiv>
            </>
        )
    }
    // TODO: input label
    else return (
        <>
            <SearchDiv>
                <h1>Puyo Puyo Characters</h1>
                <input type={"text"} id={"charSearch"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
            </SearchDiv>
            <CharsContainer>
                {
                    characters.map((char: Character) =>
                        <CharDiv firstGame={char.firstAppear !== undefined ? char.firstAppear.split(",")[0] : ""} lastGame={char.lastAppear !== undefined ? char.lastAppear.split(",")[0] : ""}>
                            <h1>{char.name}</h1>
                            <h2>({char.nameJP.unicode})</h2>
                            <p>Gender: {char.gender}</p>
                            <p>{char.birthday !== undefined ? `Birthday: ${char.birthday}` : ``}</p>
                            <p>{char.firstAppear !== undefined ? `First Appearance: ${char.firstAppear.split(",")[0]}` : ``}</p>
                            <p>{char.lastAppear !== undefined ? `Last Appearance: ${char.lastAppear.split(",")[0]}` : ``}</p>
                        </CharDiv>
                    )
                }
            </CharsContainer>
        </>
    );
}
// TODO: parse appearances for sonic
