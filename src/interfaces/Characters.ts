// interface for the attributes of each character
export interface Character {
    id: string;
    name: string;
    nameJP: { unicode: string, latin: string };
    gender: string;
    alias: string[];
    description: string;
    // optional attributes not provided for all characters:
    birthday?: string;
    firstAppear?: string;
    lastAppear?: string;
}