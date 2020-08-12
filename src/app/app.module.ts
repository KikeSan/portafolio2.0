import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFullpageModule } from "@fullpage/angular-fullpage";
import { ParticlesModule } from "angular-particle";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { AboutmeComponent } from "./aboutme/aboutme.component";
import { SkillsComponent } from "./skills/skills.component";
import { BlogComponent } from "./blog/blog.component";
import { ProjectsComponent } from "./projects/projects.component";
import { HomeComponent } from "./home/home.component";
import { GoogleAnalyticsService } from "./services/google-analytics.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent,
    SkillsComponent,
    BlogComponent,
    ProjectsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFullpageModule,
    ParticlesModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    SkillsComponent,
    BlogComponent,
    AboutmeComponent,
    GoogleAnalyticsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
