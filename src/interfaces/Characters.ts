export interface Character {
    id: string;
    name: string;
    nameJP: { unicode: string, latin: string };
    gender: string;
    alias: string[];
    description: string;
    birthday?: string;
    firstAppear?: string;
    lastAppear?: string;
}