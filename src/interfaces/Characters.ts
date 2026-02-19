export interface Character {
    id: string;
    name: string;
    nameJP: { unicode: string, latin: string };
    gender: string;
    alias: string[];
    description: string;
    birthday?: string;           // TODO: look into optional values
    firstAppear?: string;
    lastAppear?: string;
}