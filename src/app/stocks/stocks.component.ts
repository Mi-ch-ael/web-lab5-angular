import { Component, OnInit } from '@angular/core';
import {HttpclientService} from "../httpclient.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: any;
  visible: any;

  constructor(private httpService: HttpclientService) {
    this.stocks = null;
  }

  ngOnInit(): void {
    this.refresh();
    this.visible = [];
  }

  edit(stockCode: string) {
    console.debug("Called edit for", stockCode);
    this.visible[stockCode] = !this.visible[stockCode];
  }

  save(stockCode: string) {
    const moneyInput = document.getElementById(`price#${stockCode}`);
    const distrInput = document.getElementById(`distribution#${stockCode}`);

    let price = parseInt((<HTMLInputElement>moneyInput).value);
    let distr: string = (<HTMLInputElement>distrInput).value;

    console.debug(price, distr);

    this.httpService.saveStock({
      code: stockCode, price: price, distribution: distr
    }).subscribe((res: string) =>
      {
        console.debug(res);
        this.refresh();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  toggle(stockCode: string) {
    this.httpService.toggleStock(stockCode).subscribe(
      (res: string) => {
        console.debug(res);
        this.refresh();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  refresh() {
    this.httpService.getStocks().subscribe(
      (res: Object) => {
        this.stocks = res;
        console.debug(`Reloaded stocks: ${this.stocks}`);
        for(let stock of this.stocks) {
          this.visible[this.stocks.code] = false;
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

}
