import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, URLSearchParams} from '@angular/http';
import efflist from './effwordlist';

class Term {
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    moviename = "";
    movies = [];

    termList:Array<Term> = [];

    showPassword:Boolean = false;
    passwordTerms: Array<Term>;

    constructor(private http: Http){
        console.log(efflist);
    }

    chooseMovie(movie){
        console.log("choosen " + movie.original_title);
        this.searchActors(movie);
    }

    /**
     * Searches for the actors of a given movie
     * @param movie for which the actors should be searched
     */
    searchActors(movie){

        let params: URLSearchParams = new URLSearchParams();
        params.set('api_key', "6f899ff3bacaa53f5433271c891ba336");

        return this.http.get('https://api.themoviedb.org/3/movie/'+movie.id+'/credits',
            { search: params })
            .map((res: Response) => res.json())
            .subscribe((res) => {

                console.log("Actors:");
                console.log(res);

                for(var i = 0; i < 15; i++){

                    var actor = res.cast[i];

                    if(actor && actor.character){

                        //Split name
                        for(let word of actor.character.split(" ")){
                            var term:Term = new Term(word,actor.character + " in '" + movie.original_title + "' played by " + actor.name + ".", actor.profile_path, actor.id);
                            this.termList.push(term);
                        }

                    }


                }

                console.log(this.termList);

                this.showPassphraseFromTerms();

            });
    }

    /**
     * Searches for a movie with the given searchterm
     * @param searchterm The term for searching
     * @returns {any}
     */
    searchMovie(searchterm) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('query', this.moviename);
        params.set('api_key', "6f899ff3bacaa53f5433271c891ba336");

        return this.http.get('https://api.themoviedb.org/3/search/movie',
            { search: params })
            .map((res: Response) => res.json())
            .subscribe((res) => {

                console.log(res);
                this.movies = res.results;
            });
    }

    diceRoll(times:Number) {
        var result:string = "";

        for(var y = 0; y < times; y++){
            var randomNumber:number = Math.floor(Math.random() * 6) + 1;
            result += String(randomNumber);
        }
        return result;
    }

    showPassphraseFromTerms(){

        //Add random words from eff list
        for(var y = 0; y < 25; y++){
            var roll = this.diceRoll(5);
            var t:Term = new Term(efflist[roll],"Word from the english dictionary.");
            this.termList.push(t);
        }

        this.reloadPassphrase();
    }


    reloadPassphrase(){

        this.passwordTerms = [];
        for(var x = 0; x < 6; x++){
            var rand = this.termList[Math.floor(Math.random() * this.termList.length)];
            this.passwordTerms.push(rand);
        }

        this.showPassword = true;
    }
}
