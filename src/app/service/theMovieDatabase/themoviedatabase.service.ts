import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import {Term} from "../../model/term";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TheMovieDatabaseService {

    constructor(private http: Http) { }

    //API-KEY for www.themoviedb.org
    API_KEY = "6f899ff3bacaa53f5433271c891ba336";

    /**
     * Searches for a movie with the given searchterm
     * @param searchterm The term for searching
     * @returns Observable<any> an obersvable with the found movies as result
     */
    searchMovie(searchterm:string):Observable<any>{

        let params: URLSearchParams = new URLSearchParams();
        params.set('query', searchterm);
        params.set('api_key', this.API_KEY);

        return this.http.get('https://api.themoviedb.org/3/search/movie',
            { search: params })
            .map((res: Response) => {
                return res.json().results;
            });
    }

    /**
     * Searches for the actors of a given movie
     * @param movie movie for which the actors should be searched
     * @returns Observable<Term[]> an observable with the found terms as result
     */
    searchActors(movie:any): Observable<Term[]>{

        let params: URLSearchParams = new URLSearchParams();
        params.set('api_key', this.API_KEY);

        var terms:Array<Term> = [];

        return this.http.get('https://api.themoviedb.org/3/movie/'+movie.id+'/credits', { search: params })
            .map((res: any) => {

                res = res.json();

                //Take the 15 most relevant actors only
                for(var i = 0; i < 15; i++){

                    var actor = res.cast[i];

                    if(actor && actor.character){

                        //Split name
                        for(let word of actor.character.split(" ")){

                            //Prevent special actors like '(voice)' and omit words with only 1 character
                            if(word.substring(0,1) == "(" || word.length <= 1){
                                continue;
                            }

                            //Remove , and ' from the words
                            word = word.replace(/,/g,"");
                            word = word.replace(/'/g,"");

                            var term:Term = new Term(
                                word,
                                actor.character + " in '" + movie.original_title + "' played by " + actor.name + ".",
                                actor.profile_path,
                                actor.id);

                            terms.push(term);
                        }
                    }
                }

                return terms;
            });
    }
}
