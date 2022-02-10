import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../httpclient.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: any;
  ts: number;
  floor: Function;

  constructor(private httpService: HttpclientService) {
    this.settings = {};
    this.ts = 0;
    this.floor = Math.floor;
  }

  refresh(): void {
    this.ts = Date.now();
    this.httpService.getSettings().subscribe(
      (res: Object) => {
        console.debug(res);
        this.settings = res;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  save() {
    const hoursInput: HTMLInputElement = <HTMLInputElement>document.getElementById('hours');
    const minutesInput: HTMLInputElement = <HTMLInputElement>document.getElementById('minutes');
    const bargainTimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById('bargain-time');
    const priceChangeTimeoutInput: HTMLInputElement = <HTMLInputElement>document.getElementById('price-change-timeout');

    let hours = isNaN( parseInt(hoursInput.value) ) ? 0 : parseInt(hoursInput.value);
    let minutes = isNaN( parseInt(minutesInput.value) ) ? 0 : parseInt(minutesInput.value);
    let bargainTime = isNaN( parseInt(bargainTimeInput.value) ) ? 0 : parseInt(bargainTimeInput.value);
    let priceChangeTimeout = isNaN( parseInt(priceChangeTimeoutInput.value) ) ? 0 : parseInt(priceChangeTimeoutInput.value);

    this.httpService.saveSettings({
      hours: hours,
      minutes: minutes,
      bargainTime: bargainTime,
      priceChangeTimeout: priceChangeTimeout
    }).subscribe(
      (res: string) => {
        console.debug(res);
        this.refresh();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.refresh();
  }

}
