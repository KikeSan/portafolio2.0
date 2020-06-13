import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ServNodeService {
  constructor(private http: HttpClient) {}

  getInfoPersonal() {
    return this.http.get("https://serviceskikepe.herokuapp.com/infoPersonal");
  }
}
