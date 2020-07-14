import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ViewContainerRef,
  AfterViewInit,
} from "@angular/core";
import {
  faAngular,
  faGithub,
  faLinkedinIn,
  faBehance,
  faDribbble,
  faInstagram,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarAlt,
  faTimes,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { PostMediumService } from "./services/post-medium.service";
//const moment = require("moment");
//import moment from "moment";
import * as moment from "moment";
import { ServNodeService } from "./services/serv-node.service";
import { GithubApiService } from "./services/github-api.service";

import { TweenMax, Back, Power1 } from "gsap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild("bio", { static: false }) bio: ElementRef;

  faAngular = faAngular;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faBehance = faBehance;
  faInstagram = faInstagram;
  faDribbble = faDribbble;
  faMedium = faMediumM;
  faCalendarAlt = faCalendarAlt;
  faTimes = faTimes;
  faCogs = faCogs;

  title = "webpage";
  dialogTechActive = false;

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  config: any;
  fullpage_api: any;

  isloadingPage: boolean = true;

  animalike: boolean = false;
  likesTotal: number = 0;
  likesUser: number = 0;
  likesIps;
  likesInterval = 0;
  likeInterval;
  likedClicked = false;

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

  idUsuario;
  ipUsuario;
  fechaUsuario;
  horaUsuario;

  constructor(
    private postMedium: PostMediumService,
    private servNode: ServNodeService,
    private ghService: GithubApiService,
    private elementRef: ElementRef
  ) {
    // for more details on config options please visit fullPage.js docs
    this.config = {
      // fullpage options
      licenseKey: "^cC$QOO^h7", //"YOUR LICENSE KEY HERE",
      anchors: ["home", "sobremi", "habilidades", "proyectos", "blog"],
      menu: "#menu",
      navigation: true,

      afterLoad: (origin, destination, direction) => {
        console.log("Estoy en: ", destination.index);
      },
      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      onLeave: (origin, destination, direction) => {
        console.log("Estoy en: ", destination.index);
        destination.index > 0
          ? (this.menuredesBar = true)
          : (this.menuredesBar = false);

        if (destination.index == 2) {
          this.renderSkills();
        }
        if (destination.index == 4) {
          this.renderPostMedium();
        }
      },
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  openDialog() {
    this.dialogTechActive = true;
    /* gsap.to(".dialogTech__content", {
      x: 50,
      delay: 2,
		}); */
    TweenMax.fromTo(
      ".dialogTech__content",
      1,
      {
        scale: 0.2,
        opacity: 0,
        y: 100,
      },
      {
        scale: 1,
        y: 0,
        ease: Back.easeInOut,
        opacity: 1,
      }
    );
  }
  closeDialog() {
    this.dialogTechActive = false;
    TweenMax.fromTo(
      ".dialogTech__content",
      1,
      {
        opacity: 1,
      },
      {
        y: 100,
        opacity: 0,
        ease: Back.easeInOut,
        //onComplete: this.dialogCerrado,
      }
    );
  }
  dialogCerrado() {
    console.log("function cerrar dialog complete");
    this.dialogTechActive = false;
    console.log("boolean", this.dialogTechActive);
  }

  likeClick() {
    console.log("likeClick:::");
    this.likedClicked = true;
    this.repeatAnimLike();
  }
  likeDown() {
    console.log("likeDown:::");
    if (this.likesUser <= 10) {
      this.likesUser += 1;
    }
    TweenMax.fromTo(
      ".counter",
      0.3,
      { opacity: 0, y: 2, scale: 1.5 },
      { opacity: 1, y: 0, scale: 1 }
    );
    TweenMax.fromTo(
      ".counter",
      0.5,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -15, delay: 0.7 }
    );

    this.likeInterval = setInterval(() => {
      this.repeatAnimLike();
    }, 500);
  }
  likeUp() {
    console.log("likeUp:::");
    clearInterval(this.likeInterval);
    this.animalike = false;
    if (this.likesUser <= 10) {
      this.sendLikes();
    }
  }

  repeatAnimLike() {
    console.log("repeatAnimLike:::");
    this.animalike = true;
    setTimeout(() => {
      this.animalike = false;
    }, 500);
  }

  likedPage(event) {
    this.likesUser += 1;

    this.animalike = true;

    if (event.detail != this.likesInterval) {
      setTimeout(() => {
        console.log("Click LIKE!!!", this.likesUser, event);
        this.animalike = false;
        console.log("enviar data", this.likesInterval);
      }, 1200);
      this.likesInterval = event.detail;
    }
  }
  sendLikes() {
    const dataUser = {
      likes: this.likesUser,
      ip: this.ipUsuario,
      darkMode: false,
      fecha: this.fechaUsuario,
      hora: this.horaUsuario,
    };
    this.servNode
      .updateLikes({
        likes: this.likesTotal + this.likesUser,
        fecha: this.fechaUsuario,
        /* ips: [
          ...this.likesIps,
          {
            likes: this.likesUser,
            ip: "190.0.0.3",
          },
        ], */
      })
      .subscribe((res) => {
        console.log("Actualiza LIKES!!!", res);
        if (this.idUsuario) {
          this.servNode
            .updateUser(this.idUsuario, dataUser)
            .subscribe((res) => {
              console.log("Actualiza usuario", res);
            });
        } else {
          this.servNode.setUser(dataUser).subscribe((res) => {
            console.log("Agrega usuario", res);
          });
        }

        //this.likesTotal = this.likesTotal + this.likesUser;
        this.likesTotal += 1;
      });
  }

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

  renderPostMedium() {
    this.postMedium.getData().subscribe((res) => {
      console.log(res);
      this.postMediumText = res["feed"]["title"];
      this.postMediumLink = res["feed"]["link"];
      this.postMediumImage = res["feed"]["image"];

      this.postsMedium = res["items"].filter((item) => {
        return item["categories"].length > 0;
      });

      TweenMax.from(".medium .info", 1, {
        y: 50,
        opacity: 0,
        ease: Back.easeInOut,
      });
      TweenMax.from(".medium .posts", 1, {
        y: 50,
        opacity: 0,
        ease: Back.easeInOut,
        delay: 0.5,
      });
      /* let temp = 0;
      for (let i = 0; i < this.postsMedium.length; i++) {
        console.log("anima Post", temp);

        TweenMax.from(".itemPost", 0.7, {
          y: 100,
          opacity: 0,
          ease: Back.easeInOut,
          delay: temp,
        });
        temp += 0.2;
      } */
    });
  }

  renderGithubData() {
    console.log("RENDER INIT");

    this.ghService.getData().subscribe((res) => {
      console.log("RES", res["body"]);
      this.dataGithub = res["body"];
    });
  }

  private get _bio(): HTMLElement {
    return this.bio.nativeElement;
  }

  renderInfoPersonal() {
    this.servNode.getInfoPersonal().subscribe((info) => {
      console.log("Información personal", info["result"][0]);
      this.DatosPersonales.nombre = info["result"][0].nombreCompleto;
      this.DatosPersonales.titulo = info["result"][0].titulo;

      this.isloadingPage = false;

      /* gsap.to(".name", {
        x: 50,
        delay: 2,
			}); */

      /* TweenMax.to("h1", 1, {
        opacity: 0,
        duration: 1,
        stagger: 0.5,
			}); */
      //gsap.to(this.bio.nativeElement, 1, { opacity: 0, delay: 1 });
      TweenMax.from(this.bio.nativeElement, 1, {
        x: "-50",
        opacity: 0,
        ease: Back.easeOut,
      });
    });

    this.servNode.getLikes().subscribe((like) => {
      console.log(like["result"][0]);
      this.likesTotal = like["result"][0].likes;
      this.likesIps = like["result"][0].ips;
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

    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((json) => {
        this.ipUsuario = json.ip;

        moment.locale("es");
        this.fechaUsuario = moment().format("L");
        this.horaUsuario = moment().format("LT");

        this.servNode.getUser(this.ipUsuario).subscribe((res) => {
          console.log("Usuario=>", res);
          if (res["status"] == 200) {
            console.log("Usuario=>", res["result"][0]["_id"]);
            this.idUsuario = res["result"][0]["_id"];
            this.likesUser = res["result"][0]["likes"];
            this.likedClicked = true;
          }
        });
      });

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
