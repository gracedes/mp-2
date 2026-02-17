// TODO: revisit this file later, having same-origin issue at the moment so might have to scrap this

import styled from "styled-components";
import type {Character} from "../interfaces/Characters.ts";

const CharacterImageDiv = styled.div`
    margin: 10px;
    padding: 10px;
    width: 400px;
    background-color: lightblue;
`;

// TODO: implement caching to decrease loadtime

export default function ArtworkPreview({char}:{char:Character}){
    async function fetchData() {
        return String(await fetch(`https://puyonexus.com/wiki/${char.id}`)
            .then(res => {
                const html = res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(String(html), "text/html");

                const img_obj = doc.querySelector("table.infobox img");
                return (img_obj !== null) ? img_obj.getAttribute("src") : "";
            })
            .catch(error => {return `${error}`;}))
    }
    const img_url = fetchData();

    return(
        <CharacterImageDiv>
            <img src={`${img_url}`} alt={`image of ${char.name}`} />
        </CharacterImageDiv>
    )
}