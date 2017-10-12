import { Component } from '@angular/core';

import {Term} from "./model/term";
import { PassphraseManagerService } from './service/passphraseManager/passphrase-manager.service';
import {TheMovieDatabaseService} from "./service/theMovieDatabase/themoviedatabase.service";
import {HttpErrorResponse} from "../../node_modules/@angular/common/http/src/response";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [TheMovieDatabaseService,PassphraseManagerService],
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    movies = [];
    passwordTerms: Array<Term>;

    constructor(private theMoviedatabaseService: TheMovieDatabaseService, private passphraseManagerService:PassphraseManagerService){
    }

    searchMovies(query):void{

        this.theMoviedatabaseService.searchMovie(query).subscribe(
            (movies) => {
                this.movies = movies;
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            }
        );
    }

    chooseMovie(movie):void{

        this.theMoviedatabaseService.searchActors(movie).subscribe(
            (terms) => {
                this.passphraseManagerService.addTerms(terms);
                this.reloadPassphrase();
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            }
        );
    }

    reloadPassphrase():void{
        this.passwordTerms = this.passphraseManagerService.getNewPassphrase(true);
    }
}
