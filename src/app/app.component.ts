import { Component } from "@angular/core";
import {
  faAngular,
  faGithub,
  faLinkedinIn,
  faBehance,
  faDribbble,
  faInstagram,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { PostMediumService } from "./services/post-medium.service";
//const moment = require("moment");
//import moment from "moment";
import * as moment from "moment";
import { ServNodeService } from "./services/serv-node.service";
import { GithubApiService } from "./services/github-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  faAngular = faAngular;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faBehance = faBehance;
  faInstagram = faInstagram;
  faDribbble = faDribbble;
  faMedium = faMediumM;
  faCalendarAlt = faCalendarAlt;

  title = "webpage";
  dialogTechActive = false;

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  config: any;
  fullpage_api: any;

  DatosPersonales = {
    nombre: "_", //"Enrique Sanchez Q.",
    titulo: "_", //"Senior Frontend Developer | UX/UI | Designer",
  };

  menuredes = [
    {
      icon: faGithub,
      link: "https://github.com/KikeSan",
      name: "Github",
    },
    {
      icon: faBehance,
      link: "#",
      name: "BeHance",
    },
    {
      icon: faLinkedinIn,
      link: "#",
      name: "LinkedIn",
    },
    {
      icon: faInstagram,
      link: "#",
      name: "Instagram",
    },
    {
      icon: faDribbble,
      link: "#",
      name: "Dribbble",
    },
    {
      icon: faMediumM,
      link: "#",
      name: "Medium",
    },
  ];

  menuredesBar: boolean = false;

  postMediumText = "";
  postMediumLink = "";
  postMediumImage = "";
  postsMedium;

  dataGithub: any = {};
  developMember = "Developer Program Member";

  constructor(
    private postMedium: PostMediumService,
    private servNode: ServNodeService,
    private ghService: GithubApiService
  ) {
    // for more details on config options please visit fullPage.js docs
    this.config = {
      // fullpage options
      licenseKey: "^cC$QOO^h7", //"YOUR LICENSE KEY HERE",
      anchors: ["home", "sobremi", "habilidades", "proyectos", "blog"],
      menu: "#menu",
      navigation: true,

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      onLeave: (origin, destination, direction) => {
        console.log("Estoy en: ", destination.index);
        destination.index > 0
          ? (this.menuredesBar = true)
          : (this.menuredesBar = false);

        if (destination.index == 4) {
          this.renderPostMedium();
        }
      },
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  renderPostMedium() {
    const data = this.postMedium.getData().subscribe((res) => {
      console.log(res);
      this.postMediumText = res["feed"]["title"];
      this.postMediumLink = res["feed"]["link"];
      this.postMediumImage = res["feed"]["image"];

      this.postsMedium = res["items"].filter((item) => {
        return item["categories"].length > 0;
      });
    });
  }

  renderGithubData() {
    console.log("RENDER INIT");

    this.ghService.getData().subscribe((res) => {
      console.log("RES", res["body"]);
      this.dataGithub = res["body"];
    });
  }

  renderInfoPersonal() {
    const data = this.servNode.getInfoPersonal().subscribe((info) => {
      console.log("Información personal", info["result"][0]);
      this.DatosPersonales.nombre = info["result"][0].nombreCompleto;
      this.DatosPersonales.titulo = info["result"][0].titulo;
    });
  }

  changeFormatDate(fecha) {
    moment.locale("es");
    return moment(fecha).format("LL");
  }

  getColorCalendarGithub(count) {
    let clase;

    count > 12
      ? (clase = "commit fill darker")
      : count > 7
      ? (clase = "commit fill dark")
      : count > 4
      ? (clase = "commit fill normal")
      : count > 0
      ? (clase = "commit fill light")
      : (clase = "commit white");

    return clase;
  }

  ngOnInit() {
    this.renderInfoPersonal();
    console.log("LOAD INIT");

    this.renderGithubData();

    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#89a2e1",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.2,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6281d6",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 350,
            line_linked: {
              opacity: 0.4,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    };
  }
}
