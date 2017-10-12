import { Injectable } from '@angular/core';
import {Term} from "../../model/term";
import efflist from '../../effwordlist';

@Injectable()
export class PassphraseManagerService {

    constructor() { }

    passPhraseLength:number = 6;

    //List of all found Terms
    termList:Array<Term> = [];

    /**
     * Adds the given terms to the list of all terms
     * @param terms the terms which should be added
     */
    addTerms(terms:Array<Term>):void{
        this.termList = this.termList.concat(terms);
    }

    /**
     *
     * before generating a new passphrase random dictionary words are getting added to the termlist
     * @returns {Array} the new passphrase
     */

    /**
     * Delivers a new random Passphrase from all the password terms,
     * @param addDictionaryWords true if random dictionary words should be added to the termlist, default true
     * @returns {Array<Term>} the new passphrase
     */
    getNewPassphrase(addDictionaryWords?:Boolean) : Array<Term> {

        var tempTermList:Array<Term> = [];
        tempTermList = tempTermList.concat(this.termList);

        if(addDictionaryWords){
            //Add as much random words from the eff-list as terms in the list
            for(var y = 0; y < this.termList.length; y++){
                var roll = this.diceRoll(5);
                var t:Term = new Term(efflist[roll],"Word from the english dictionary.");
                tempTermList.push(t);
            }
        }


        var passwordTerms:Array<Term> = [];

        for(var x = 0; x < this.passPhraseLength; x++){

            var index = Math.floor(Math.random() * tempTermList.length);

            var rand = tempTermList[index];
            passwordTerms.push(rand);

            //Delete element from array to prevent duplicates
            tempTermList.splice(index, 1);
        }

        return passwordTerms;
    }

    /**
     * Simulates dicerolls with a 6 sided dice
     * @param times how often the dice should be rolled
     * @returns {string} the result in the format <firstResult><secondResult>..., e.g. 453231
     */
    private diceRoll(times:Number):string {
        var result:string = "";

        for(var y = 0; y < times; y++){
            var randomNumber:number = Math.floor(Math.random() * 6) + 1;
            result += String(randomNumber);
        }

        return result;
    }
}