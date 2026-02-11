import PuyoNexus from "./components/PuyoNexus.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import type {Character} from "./interfaces/Characters.ts";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
`;

export default function App(){

    // useState Hook to store Data.
    const [data, setData] = useState<Character[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawData = await fetch("https://deltadex7-puyodb-api-deno-9thxn4rqxy9g.deno.dev/api/v1/characters");
            const {data} : {data: Character[]} = await rawData.json();          // I had to rename results to data since that is the json label used by this api, I know it looks more confusing
            setData(data);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was the error: " + e));
    }, [data.length]);

    return(
        <ParentDiv>
            <PuyoNexus data={data}/>
        </ParentDiv>
    )
}
