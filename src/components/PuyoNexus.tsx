import styled from "styled-components";
import type {Character} from "../interfaces/Characters.ts";

const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: bisque;
`;

const SingleCharDiv=styled.div<{status: string}>`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: ${(props)=>(props.status === "Female" ? 'lightpink' : 'lightblue')};
    color: ${(props) => (props.status !== "Female" ? 'black' : 'white')};
    border: 3px darkred solid;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
`;

export default function PuyoNexus(props : { data:Character[] } ){
    return (
        <AllCharsDiv >
            {
                props.data.map((char: Character) =>
                    <SingleCharDiv key={char.id} status={char.gender}>
                        <h1>{char.name}</h1>
                        <p>Gender: {char.gender}</p>
                        <p>Birthday: {char.birthday}</p>
                        <p>About: {char.description}</p>
                        <p>First Appearance: {char.firstAppear}</p>
                        <p>Last Appearance: {char.lastAppear}</p>
                    </SingleCharDiv>
                )
            }
        </AllCharsDiv>
    );
}
