import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HttpclientService {
  constructor(private http: HttpClient) {}

  test() {
    return this.http.get("http://localhost:4443/test", {responseType: 'text'})
  }

  getBrokers() {
    return this.http.get("http://localhost:4443/brokers", {responseType: "json"});
  }

  toggleBroker(brokerId: number) {
    return this.http.post("http://localhost:4443/toggle-brokers",
      {id: brokerId}, {responseType: "text"});
  }

  saveBroker(newBrokerData: Object) {
    return this.http.post("http://localhost:4443/edit-brokers", newBrokerData, {responseType: 'text'});
  }

  deleteBroker(brokerId: number) {
    return this.http.post("http://localhost:4443/brokers/delete",
      {id: brokerId}, {responseType: "text"});
  }

  save() {
    return this.http.get("http://localhost:4443/save", {responseType: "text"});
  }

  getStocks() {
    return this.http.get("http://localhost:4443/stocks", {responseType: "json"});
  }

  toggleStock(stockCode: string) {
    return this.http.post("http://localhost:4443/stocks/toggle",
      {code: stockCode}, {responseType: "text"});
  }

  saveStock(newStockData: Object) {
    return this.http.post("http://localhost:4443/stocks/edit",
      newStockData, {responseType: "text"});
  }

  getSettings() {
    return this.http.get("http://localhost:4443/settings", {responseType: "json"});
  }

  saveSettings(newSettings: Object) {
    return this.http.post("http://localhost:4443/settings/edit",
      newSettings, {responseType: "text"});
  }
}
