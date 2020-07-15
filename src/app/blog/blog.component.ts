import { Component, OnInit } from "@angular/core";
import { PostMediumService } from "../services/post-medium.service";
import { TweenMax, Back, Power1 } from "gsap";
import { GithubApiService } from "../services/github-api.service";
import * as moment from "moment";
import {
  faCalendarAlt,
  faTimes,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faTimes = faTimes;

  postMediumText = "";
  postMediumLink = "";
  postMediumImage = "";
  postsMedium;

  dataGithub: any = {};
  developMember = "Developer Program Member";

  constructor(
    private postMedium: PostMediumService,
    private ghService: GithubApiService
  ) {}

  ngOnInit() {
    this.renderPostMedium();
    this.renderGithubData();
  }

  changeFormatDate(fecha) {
    moment.locale("es");
    return moment(fecha).format("LL");
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
}
