import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private _http: HttpClient
  ) { }

  save(data) {
    return this._http.post(environment.endPoint + 'save', data);
  }

  getAll() {
    return this._http.get(environment.endPoint + 'list');
  }

  updateAuthor(author) {
    return this._http.put(environment.endPoint + 'author/' + author.id, author);
  }

  deleteAuthor(id) {
    return this._http.delete(environment.endPoint + 'author/' + id);
  }

}
