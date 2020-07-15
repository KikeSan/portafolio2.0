import { Component, OnInit } from "@angular/core";
import { TweenMax, Back, Power1 } from "gsap";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  renderSkills() {
    TweenMax.from(".animFront", 1, {
      y: 50,
      opacity: 0,
      ease: Back.easeOut,
      delay: 0.5,
    });
    TweenMax.from(".animBack", 1, {
      y: 50,
      opacity: 0,
      ease: Back.easeOut,
      delay: 0.7,
    });
    TweenMax.from(".animMobile", 1, {
      y: 50,
      opacity: 0,
      ease: Back.easeOut,
      delay: 0.9,
    });

    TweenMax.from(".dojo", 1, {
      x: 200,
      opacity: 0,
      ease: Back.easeInOut,
      delay: 1.5,
    });

    TweenMax.to(".dojo", 2, {
      y: 15,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeOut,
    });
  }
}
