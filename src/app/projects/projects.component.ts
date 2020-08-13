import { Component, OnInit } from "@angular/core";
import { TweenMax, Back, Power1, Elastic } from "gsap";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      name: "App Facturador",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808_opt/98720596196041.Y3JvcCw4MTAsNjMzLDAsMA.png",
      url: "https://www.behance.net/gallery/96196041/App-Facturador",
      like: 5,
      views: 16,
    },
    {
      name: "Metro.pe",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808_opt/f0a3ca83533027.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
      url: "https://www.behance.net/gallery/83533027/Metrope",
      like: 5,
      views: 19,
    },
    {
      name: "La Semana en Wong",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808_opt/05993860075981.Y3JvcCw4MTAsNjM0LDAsMA.png",
      url: "https://www.behance.net/gallery/60075981/La-Semana-en-Wong",
      like: 3,
      views: 49,
    },
    {
      name: "Wong School",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/834dc548826455.Y3JvcCw0MDUsMzE3LDAsMA.png",
      url: "https://www.behance.net/gallery/96196041/App-Facturador",
      like: 5,
      views: 16,
    },
    {
      name: "Mi vida, mi tarjeta",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/5d001847046373.Y3JvcCw0MDUsMzE3LDAsMA.png",
      url: "https://www.behance.net/gallery/47046373/Mi-vida-Mi-tarjeta",
      like: 3,
      views: 39,
    },
    {
      name: "Navidad Wong",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/78132a46600167.Y3JvcCw0MDUsMzE3LDgsMA.png",
      url: "https://www.behance.net/gallery/46600167/Navidad-Wong-2016",
      like: 6,
      views: 127,
    },
    {
      name: "Pulse App Android",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/03a1c259783999.Y3JvcCw4MTAsNjM0LDAsMA.png",
      url: "https://www.behance.net/gallery/59783999/Pulse-APP-Android",
      like: 1,
      views: 19,
    },
    {
      name: "Wongderland",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/ac403842628897.Y3JvcCw3MTksNTYzLDM5MiwyMjM.jpg",
      url: "https://www.behance.net/gallery/42628897/Wongderland",
      like: 5,
      views: 114,
    },
  ];

  constructor() {}

  ngOnInit() {}

  animaProyectos() {
    /* TweenMax.from(".medium .info", 1, {
      y: 50,
      opacity: 0,
      ease: Back.easeInOut,
    }); */
    let elements = document.getElementsByClassName("proyItem");
    let elementsArr = Array.from(elements);

    let temp = 0.5;
    elementsArr.forEach((element) => {
      TweenMax.from(element, 1, {
        //y: 70,
        scale: 0.1,
        opacity: 0,
        ease: Back.easeInOut,
        delay: temp, //0.5,
      });
      temp += 0.07;
    });
  }
}
