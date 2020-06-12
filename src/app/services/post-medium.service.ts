import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostMediumService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kikesan"
    );
  }
}
