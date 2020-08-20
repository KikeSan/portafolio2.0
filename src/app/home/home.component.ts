import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  faAngular,
  faGithub,
  faLinkedinIn,
  faBehance,
  faDribbble,
  faInstagram,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import { ServNodeService } from "../services/serv-node.service";
import { TweenMax, Back, Power1, Elastic } from "gsap";
import { GoogleAnalyticsService } from "../services/google-analytics.service";
import { environment } from "../../environments/environment";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("bio", { static: false }) bio: ElementRef;
  @ViewChild("cargo", { static: false }) cargo: ElementRef;
  @ViewChild("redes", { static: false }) redes: ElementRef;
  @Output() homeCargado = new EventEmitter<boolean>();

  faAngular = faAngular;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faBehance = faBehance;
  faInstagram = faInstagram;
  faDribbble = faDribbble;
  faMedium = faMediumM;

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

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(
    private servNode: ServNodeService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  sendSocialEvent(category, label) {
    this.googleAnalyticsService.eventEmitter(
      category,
      environment.gaCategory,
      label
    );
  }

  renderInfoPersonal() {
    console.log("init Render data personal");

    this.servNode.getInfoPersonal().subscribe((info) => {
      console.log("Información personal", info["result"][0]);
      this.DatosPersonales.nombre = info["result"][0].nombreCompleto;
      this.DatosPersonales.titulo = info["result"][0].titulo;

      TweenMax.from(this.bio.nativeElement, 1.2, {
        x: "-150",
        opacity: 0,
        delay: 0.7,
        ease: Back.easeOut,
      });
      TweenMax.from(this.cargo.nativeElement, 1.2, {
        x: "-150",
        opacity: 0,
        delay: 0.8,
        ease: Back.easeOut,
      });
      TweenMax.from(this.redes.nativeElement, 1.2, {
        y: "50",
        opacity: 0,
        delay: 1,
        ease: Back.easeOut,
      });

      this.homeCargado.emit(true);
    });
  }

  /* animaInfoPersonal() {
    console.log("ANIMA HOME ---------------------------------");

    TweenMax.from(this.bio.nativeElement, 1.2, {
      x: "-150",
      opacity: 0,
      delay: 0.7,
      ease: Back.easeOut,
    });
    TweenMax.from(this.cargo.nativeElement, 1.2, {
      x: "-150",
      opacity: 0,
      delay: 0.8,
      ease: Back.easeOut,
    });
    TweenMax.from(this.redes.nativeElement, 1.2, {
      y: "50",
      opacity: 0,
      delay: 1,
      ease: Back.easeOut,
    });
  } */

  ngOnInit() {
    this.renderInfoPersonal();

    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100vh",
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
          value: 0.3,
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
