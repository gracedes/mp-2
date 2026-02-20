// NOTE: this is code I wrote when I was trying to fetch images directly from the wiki
// page of each character since the API does not supply image links and the wiki does
// not have a consistent image file name format which I could parse the char.id into,
// but I was ultimately not able to scrape them manually due to CORS limitations,
// so I gave up on using images but I don't want to delete this code because it
// took me a while and I would feel bad deleting it all :(

import styled from "styled-components";
import type {Character} from "../interfaces/Characters.ts";

const CharacterImageDiv = styled.div`
    margin: 10px;
    padding: 10px;
    width: 400px;
    background-color: lightblue;
`;

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