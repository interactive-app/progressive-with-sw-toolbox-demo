
export interface Buchung {
    
    flugId: number;
    passagierId: number;
    status: number;
    flug: Flug; 
    
}

export interface Flug {
    id: number;
    abflugort: string;
    zielort: string;
    datum: string;
}