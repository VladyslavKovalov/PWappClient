# PWappClient

Angular2/ASP.Net Core "money" transactions sample
This sample shows how to connect Angular 2 and ASP.Net Core. This project uses identityServer4, ngrx/store, webSockets, EFcore, Bootstrap 3 and PrimeNg

This is a clien app. To server part, check https://github.com/VladyslavKovalov/PWappServer

##How To
Try to create two new users with different sessions, then try to send betweeen them some transactions. You can check previous transactions in "History". 



![alt tag](https://media.giphy.com/media/26xBxAEQEDboWi2Qg/source.gif)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.20-4.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## List of technologies
websocket from https://github.com/chadjougit/websocket-manager (modified)

IdentityServer4 from https://github.com/IdentityServer/IdentityServer4

ngrx/store (Redux) from https://github.com/ngrx/store

and others..

##Configuration



You need to replace url's in config.ts 
To enable console, please commit  Log.setProductionMode() in app.component.ts

##Updating Angular CLI

https://github.com/angular/angular-cli#updating-angular-cli

  

