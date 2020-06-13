/* import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

const GET_GH = gql`
  {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay

            contributionDays {
              weekday
              contributionCount
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class GithubApiService {
  constructor(private apollo: Apollo) {}
}
 */