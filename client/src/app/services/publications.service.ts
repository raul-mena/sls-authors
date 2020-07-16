import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(
    private _http: HttpClient
  ) { }

  getPublicationByAuthorId(id) {
    return this._http.get(environment.endPoint + 'publications/' + id);
  }

  save(item) {
    return this._http.post(environment.endPoint + 'publications', item);
  }

  deletePublication(id) {
    return this._http.delete(environment.endPoint + 'publications/' + id);
  }

  updatePublication(data) {
    return this._http.put(environment.endPoint + 'publications/' + data.id, data);
  }
}
