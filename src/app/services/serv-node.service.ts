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
    console.log("body set likes", body);
    //localStorage.setItem('ipUser',body.ip)
    return this.http.post(environment.pathService + "/likes/", body);
  }
  updateLikes(body) {
    return this.http.put(
      `${environment.pathService}/likes/5eed54fa47bce58dd40de751`,
      body
    );
  }

  getUser(ip) {
    return this.http.get(`${environment.pathService}/users/${ip}`);
  }
  setUser(body) {
    return this.http.post(environment.pathService + "/users/", body);
  }
  updateUser(id, body) {
    return this.http.put(`${environment.pathService}/users/${id}`, body);
  }
}
