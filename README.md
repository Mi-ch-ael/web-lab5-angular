# web-lab5-angular

The goal of this educational project was to get familiar with Typescript and Angular framework. Also, the project includes a simple Node.js backend.

## Description

The task was to create a web application which would allow to edit and export data for yet another educational project "stock market": a list of brokers at the stock market, a list of stocks and some general settings (trading time, stock price change frequency). It was to be done via RESTful client-server interaction.

## Launch

Install dependencies (`npm install`), then launch by executing `npm run run`, which executes `node src/server/server.js & ng serve`. An app will run on `http://localhost:4200/`. Backend server will listen port 4443. Check it by visiting `http://localhost:4443/test` -- server should return `Hello World!` as plain text.

Default settings can be found in `src/server/data/default`; these settings are loaded each time backend server is restarted. Custom settings are saved in `src/server/data` when user presses "Save settings to file" button.

## Screenshots

Brokers page:
![Brokers page screenshot](https://user-images.githubusercontent.com/54897530/153722328-da849416-7ffc-479b-9d34-26b34c9faddb.png)

Settings page:
![Screenshot from 2021-11-30 23-11-47](https://user-images.githubusercontent.com/54897530/153722395-c44bd142-ff81-43a3-831e-63a596d0110d.png)

Stocks page (companies and stock abbreviations are made up):
![Screenshot from 2021-11-30 23-12-14](https://user-images.githubusercontent.com/54897530/153722403-67252d52-da1b-42ef-a581-14048b5375d6.png)
