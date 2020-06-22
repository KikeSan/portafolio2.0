import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ServNodeService {
  constructor(private http: HttpClient) {}

  getInfoPersonal() {
    return this.http.get(environment.pathService + "/infoPersonal");
  }
  getLikes() {
    return this.http.get(environment.pathService + "/likes");
  }
  setLikes(body) {
    return this.http.put(
      environment.pathService + "/likes/5eed54fa47bce58dd40de751",
      body
    );
  }
}
