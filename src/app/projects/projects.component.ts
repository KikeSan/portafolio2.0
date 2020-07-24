import { Component, OnInit } from "@angular/core";

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
      name: "Navidad Wong",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/max_808/78132a46600167.Y3JvcCw0MDUsMzE3LDgsMA.png",
      url: "https://www.behance.net/gallery/46600167/Navidad-Wong-2016",
      like: 6,
      views: 127,
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
}
