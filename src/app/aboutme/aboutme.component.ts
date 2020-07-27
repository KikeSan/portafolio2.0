import { Component, OnInit } from "@angular/core";
import Parallax from "../../../node_modules/parallax-js";

@Component({
  selector: "app-aboutme",
  templateUrl: "./aboutme.component.html",
  styleUrls: ["./aboutme.component.scss"],
})
export class AboutmeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let scene = document.getElementById("sceneAboutMe");
    let parallaxInstance = new Parallax(scene);
  }
}
