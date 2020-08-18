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

import { SkillsComponent } from "./skills/skills.component";
import { BlogComponent } from "./blog/blog.component";
import Parallax from "../../node_modules/parallax-js";
import { AboutmeComponent } from "./aboutme/aboutme.component";
import { Router, NavigationEnd } from "@angular/router";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { environment } from "../environments/environment";
import { ProjectsComponent } from "./projects/projects.component";
import { TweenMax, Back, Power1, Elastic } from "gsap";
//import { sep } from "path";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
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
      link: "https://www.instagram.com/kikesan.dev/",
      name: "Instagram",
    },
    {
      icon: faDribbble,
      link: "#",
      name: "Dribbble",
    },
    {
      icon: faMediumM,
      link: "https://medium.com/@kikesan",
      name: "Medium",
    },
  ];

  menuredesBar: boolean = false;

  idUsuario;
  ipUsuario;
  fechaUsuario;
  horaUsuario;

  constructor(
    private postMedium: PostMediumService,
    private servNode: ServNodeService,
    private ghService: GithubApiService,
    private elementRef: ElementRef,
    private skills: SkillsComponent,
    private proyectos: ProjectsComponent,
    private blog: BlogComponent,
    private aboutme: AboutmeComponent,
    public router: Router,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    /** GA */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-123947168-1", {
          page_title: "Homepage 2.0",
          page_path: event.urlAfterRedirects,
        });
      }
    });

    // for more details on config options please visit fullPage.js docs
    this.config = {
      // fullpage options
      licenseKey: "^cC$QOO^h7", //"YOUR LICENSE KEY HERE",
      anchors: ["home", "sobremi", "habilidades", "proyectos", "blog"],
      menu: "#menu",
      navigation: true,
      controlArrows: false,

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

        if (destination.index == 1) {
          this.aboutme.initParallax();
        }
        if (destination.index == 2) {
          //this.renderSkills();
          this.skills.renderSkills();
        }
        if (destination.index == 3) {
          this.proyectos.animaProyectos();
        }
        if (destination.index == 4) {
          this.blog.animaMedium();
          //this.renderPostMedium();
          //this.blog.renderPostMedium();
          //this.blog.initBTNevents();
        }
      },
    };
  }

  //t1 = gsap.timeline({ repeat: 1, repeatDelay: 1 });

  onMouseOver(e) {
    //this.t1.to(e.currentTarget, { scale: 1.2, duration: 1.2 });
    TweenMax.to(e.currentTarget, 1.2, { scale: 1.2, ease: Elastic.easeOut });
  }

  onMouseLeave(e) {
    //this.t1.to(e.currentTarget, { scale: 1, duration: 1.2 });
    TweenMax.to(e.currentTarget, 0.8, {
      scale: 1,
      ease: Back.easeOut,
    });
  }

  sendGAEvent(category, label) {
    this.googleAnalyticsService.eventEmitter(
      category,
      environment.gaCategory,
      label
    );
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

    let scene = document.getElementById("sceneTech");
    let parallaxInstance = new Parallax(scene);
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
    if (this.likesUser < 10) {
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
    if (this.likesUser < 10) {
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
            this.idUsuario = res["usuario"]["_id"];
          });
        }

        //this.likesTotal = this.likesTotal + this.likesUser;
        this.likesTotal += 1;
      });
  }

  /* private get _bio(): HTMLElement {
    return this.bio.nativeElement;
  } */

  ngOnInit() {
    //this.renderInfoPersonal();
    console.log("LOAD INIT");

    //this.blog.renderGithubData();
    //this.renderGithubData();

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

        this.servNode.getLikes().subscribe((like) => {
          console.log(like["result"][0]);
          this.likesTotal = like["result"][0].likes;
          this.likesIps = like["result"][0].ips;
        });
      });
  }
}
