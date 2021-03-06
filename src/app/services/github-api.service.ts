import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GithubApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get("https://serviceskikepe.herokuapp.com/github");
    //return this.http.get("http://localhost:3001/github");
  }
}
