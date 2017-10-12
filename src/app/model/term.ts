export class Term {
    word: string;
    explanation: string;
    pictureUrl: string;
    personID: string;
    link: string;

    constructor(word: string, explanation?: string, pictureUrl?: string, personID?:string ) {
        this.explanation = explanation;
        this.word = word.toLowerCase();
        this.pictureUrl = pictureUrl;
        this.personID = personID;
        this.link = "https://www.themoviedb.org/person/" + personID;
    }

}
