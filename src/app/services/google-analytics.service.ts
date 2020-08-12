import { Injectable } from "@angular/core";

declare let gtag: Function;

@Injectable({
  providedIn: "root",
})
export class GoogleAnalyticsService {
  constructor() {}

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventLabel: string = null,
    eventAction: string = null,
    eventValue: number = null
  ) {
    console.log(
      "GA Service:",
      eventCategory + " / " + eventName + " / " + eventLabel
    );

    /* prettier-ignore */
    gtag("event", eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel,
    });
  }
}
