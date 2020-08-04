import { Component, OnInit } from "@angular/core";
import Parallax from "../../../node_modules/parallax-js";

@Component({
  selector: "app-aboutme",
  templateUrl: "./aboutme.component.html",
  styleUrls: ["./aboutme.component.scss"],
})
export class AboutmeComponent implements OnInit {
  parallaxInstance;
  constructor() {}

  ngOnInit() {
    let scene = document.getElementById("sceneAboutMe");
    this.parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });

    //this.parallaxInstance.disable();
    console.log("en Init", this.parallaxInstance);
  }
  initParallax() {
    console.log("en initParallax", this.parallaxInstance);

    //this.parallaxInstance.enable();
  }
}
