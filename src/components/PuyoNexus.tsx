import {useEffect, useState} from "react";
import type {Character} from "../interfaces/Characters.ts";
import {Games} from "../interfaces/Games.ts";
 import styled from "styled-components";

 // the container that holds all of the characters :)
 const CharsContainer = styled.div`
     display: flex;
     flex-flow: row wrap;
     justify-content: space-evenly;
     width: 100vw;
 `;

 // css for the individual character tiles
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
     // I set the background color based on how long the character's run in the series was, calculated with game
     // release years that are retrieved by indexing the constant from Games.ts with the game title provided by the api.
     // the denominator represents the longest theoretical run, times 1.75 for aesthetic purposes.
     // longest running characters have a bolder blue background, while short-term characters are mostly grey
     background-color: ${(props) => (`rgba(98, 180, 255, ${(Games[props.lastGame] - Games[props.firstGame]) / (1.75 * (2026 - 1989))})`)};
     
     // make the box shadow a little wider on hover
    &:hover {
        box-shadow: 0 0 15px rgb(98, 180, 225);
    }
 `;

 // div for the header and search bar
 const SearchDiv = styled.div`
     text-align: center;
     margin-top: 1vh;
     font: italic small-caps bold calc(2px + 1vw) Arial;
     
     // make the input box rounded with the same box shadow as the characters
     & input {
         border: 3px rgb(98, 180, 225) solid;
         border-radius: 15px;
         box-shadow: 0 0 10px rgb(98, 180, 225);
         width: 96%;
         margin: 2vh 2%;
         padding: 1%;
         
         // when the input field is typed in, make box shadow larger
         &:focus {
             box-shadow: 0 0 15px rgb(98, 180, 225);
             outline: none;
         }
     }
 `;

 // div for the "loading" and "no results" messages
 const MsgDiv = styled.div`
     width: 100vw;
     text-align: center;
     font: italic small-caps bold calc(2px + 1vw) Arial;
 `;

export default function PuyoNexusContent(){
    const [searchText, setSearchText] = useState("");           // stores the search input, starts out as empty string
    const [characters, setCharacters] = useState<Character[]>([])         // list of characters

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://deltadex7-puyodb-api-deno-9thxn4rqxy9g.deno.dev/api/v1/characters/${searchText}`);     // fetch from the api, with the search text appended
            const rawData = await res.json();
            setCharacters(rawData.data);                                                                                                            // set characters list with api response
        }
        fetchData().then(()=>console.log("okay")).catch((e) => console.log(e));                                             // error logging
    }, [characters, searchText]);

    if (!characters) {
        // if there is no search but the characters are being fetched:
        if (searchText === "") return (
            <>
                <SearchDiv>
                    <h1>Puyo Puyo Characters</h1>
                    <input type={"text"} id={"charSearch"} aria-label={"search"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
                </SearchDiv>
                <MsgDiv><h1>Loading...</h1></MsgDiv>
            </>
        )
        // if a search term with no results is entered:
        else return (
            <>
                <SearchDiv>
                    <h1>Puyo Puyo Characters</h1>
                    <input type={"text"} id={"charSearch"} aria-label={"search"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
                </SearchDiv>
                <MsgDiv><h1>No characters match your search! :(</h1></MsgDiv>
            </>
        )
    }
    // otherwise:
    else return (
        <>
            <SearchDiv>
                <h1>Puyo Puyo Characters</h1>
                {/*
                    input field for the search function, on change send the event's string to be set by setSearchText

                    note: aria-label={"search"} is used to provide a label which is still picked up on by screen readers,
                    while not changing the visual design for the page since the placeholder will indicate to seeing
                    users what the field is for
                */}
                <input type={"text"} id={"charSearch"} aria-label={"search"} placeholder={"Search..."} onChange={(e)=>setSearchText(String(e.target.value))}/>
            </SearchDiv>
            <CharsContainer>
                {
                    characters.map((char: Character) =>
                        // firstGame and lastGame are props for our styled div, which we only want to send if they are not undefined.
                        // otherwise, send an empty string. also only sends first listed game for characters with multiple games listed
                        <CharDiv firstGame={char.firstAppear !== undefined ? char.firstAppear.split(",")[0] : ""} lastGame={char.lastAppear !== undefined ? char.lastAppear.split(",")[0] : ""}>
                            <h1>{char.name}</h1>
                            <h2>({char.nameJP.unicode})</h2>
                            <p>Gender: {char.gender}</p>    
                            {/*
                                these are optional elements which the api does not supply for every character, so we
                                only want the text to show if the element is defined.
                             */}
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