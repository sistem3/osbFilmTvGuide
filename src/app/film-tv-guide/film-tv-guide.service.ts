import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FilmTvGuideService {

  baseUrl = '';
  apiKey = '';

  constructor(private http: Http) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '892ae99b0451fed76a0ece0a8d0c1414';
  }

  getDetails(section, id) {
    return this.http.get(this.baseUrl + section + '/' + id + '?api_key=' + this.apiKey)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getData(section, searchTerm, pageNumber) {
    return this.http.get(this.baseUrl +
      section + '/' + searchTerm +
      '?page=' + pageNumber +
      '&api_key=' + this.apiKey)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
