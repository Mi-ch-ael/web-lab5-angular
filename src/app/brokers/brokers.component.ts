import { Component, OnInit } from '@angular/core';
import {HttpclientService} from "../httpclient.service";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  constructor(private httpService: HttpclientService) { this.brokers = null; }
  brokers: any;
  formsVisibility: Array<boolean> = new Array<boolean>();

  ngOnInit(): void {
    this.httpService.getBrokers().subscribe(
      (response: Object) => {
          this.brokers = response;
          console.debug(`Brokers fetched: ${this.brokers}`);
          this.formsVisibility.length = this.brokers.length;
          console.debug(this.formsVisibility);
      },
      (error: any) => {
          console.error(error);
      }
    );
  }

  toggleEdit(brokerIndex: number): void {
    console.debug(brokerIndex);
    this.formsVisibility[brokerIndex] = !this.formsVisibility[brokerIndex];
    console.debug(this.formsVisibility);
  }

  toggleIncluded(brokerIndex: number): void {
    this.httpService.toggleBroker(brokerIndex).subscribe(
      (response: string) => {
        console.debug(`Toggle succeeded: ${response}`);
      },
      (err: any) => {
        console.error(err);
      }
    );
    this.httpService.getBrokers().subscribe(
      (response: Object) => {
        this.brokers = response;
        console.debug(`Brokers fetched: ${this.brokers}`);
        this.formsVisibility.length = this.brokers.length;
        console.debug(this.formsVisibility);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  saveBrokerData(brokerIndex: number): void {
    this.formsVisibility[brokerIndex] = false;

    const firstNameInput = document.getElementById(`firstName#${brokerIndex}`);
    const lastNameInput = document.getElementById(`lastName#${brokerIndex}`);
    const countryInput = document.getElementById(`country#${brokerIndex}`);
    const moneyInput = document.getElementById(`money#${brokerIndex}`);
      let money: number = parseInt((<HTMLInputElement>moneyInput).value);
      if(money < 0 || money > 20000) money = NaN;

      const newData = {
        id: brokerIndex,
        firstName: (<HTMLInputElement>firstNameInput).value,
        lastName: (<HTMLInputElement>lastNameInput).value,
        country: (<HTMLSelectElement>countryInput).value,
        money: money
      }
      console.debug(newData);
    this.httpService.saveBroker(newData).subscribe(
      (response: string) => {
        console.debug(`Saved ok: ${response}`);
      },
      (err: any) => {
        console.error(err);
      }
    );
    this.httpService.getBrokers().subscribe(
      (response: Object) => {
        this.brokers = response;
        console.debug(`Brokers fetched: ${this.brokers}`);
        this.formsVisibility.length = this.brokers.length;
        console.debug(this.formsVisibility);
        window.location.reload();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  addBroker(): void {
    console.debug("addBroker() invoked");
    const firstNameInput = document.getElementById(`newFirstName`);
    const lastNameInput = document.getElementById(`newLastName`);
    const countryInput = document.getElementById(`newCountry`);
    const moneyInput = document.getElementById(`newMoney`);

    let money: number = parseInt((<HTMLInputElement>moneyInput).value);
    if(money < 0 || money > 20000) money = NaN;

    const newData = {
      id: null,
      firstName: (<HTMLInputElement>firstNameInput).value,
      lastName: (<HTMLInputElement>lastNameInput).value,
      country: (<HTMLSelectElement>countryInput).value,
      money: money
    }

    console.debug(newData);
    this.httpService.saveBroker(newData).subscribe(
      (response: string) => {
        console.debug(`Saved ok: ${response}`);
      },
      (err: any) => {
        console.error(err);
      }
    );
    this.httpService.getBrokers().subscribe(
      (response: Object) => {
        this.brokers = response;
        console.debug(`Brokers fetched: ${this.brokers}`);
        this.formsVisibility.length = this.brokers.length;
        console.debug(this.formsVisibility);
        window.location.reload();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  deleteBroker(brokerIndex: number) {
    console.debug("deleteBroker() invoked");
    if(!confirm(`Do you really want to delete this broker?`)) return;
    this.httpService.deleteBroker(brokerIndex).subscribe(
      (res: string) => {
        console.debug("deletion ok");
        this.httpService.getBrokers().subscribe(
          (response: Object) => {
            this.brokers = response;
            console.debug(`Brokers fetched: ${this.brokers}`);
            this.formsVisibility.length = this.brokers.length;
            console.debug(this.formsVisibility);
            for(let i = 0; i < this.brokers.length; ++i) {
              this.formsVisibility[i] = false;
            }
          },
          (err: any) => {
            console.error(err);
          }
        );
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

}
