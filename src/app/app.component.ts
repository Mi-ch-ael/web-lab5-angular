import {Component, OnInit} from '@angular/core';
import { HttpclientService } from "./httpclient.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpclientService]
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpclientService) {}
  ngOnInit(): void {
      console.debug("ngOnInit() invoked");
      this.httpService.test().subscribe(
        (response: any) => {
          console.debug(`Got response: ${response}`)
        },
        (error: any) => {
          console.error(error);
        }
      );

  }
  saveSettings(): void {
    this.httpService.save().subscribe(
      (response: string) => {
        console.debug("Success. Response: ", response);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
