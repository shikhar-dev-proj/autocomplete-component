import { Injectable } from "@angular/core";
// import { HttpClient } from '@angular/common/http';

// @Injectable()
export class MovieService {

    // constructor(public http: HttpClient) {}

    // public fetchMovieNames(searchStr: string, url = 'http://www.omdbapi.com/?apikey=81df2a82'): Promise<string[]> {
    //     return this.http.get(url + `&s=${searchStr}`).toPromise().then((res) => {
    //         return res['Search'].map(m => m['Title']);
    //     });
    // }

    fetchMovieNames(searchStr: string): Promise<string[]> {
        return fetch(`http://www.omdbapi.com/?apikey=81df2a82&s=${searchStr}`)
        .then(response => response.json())
        .then(data => data['Search'].map(m => m['Title']));
    }

}