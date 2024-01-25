// import { interval, fromEvent } from 'rxjs';
// import { mergeMap, scan, tap } from 'rxjs/operators';
//
// fromEvent(document, 'click')
//   .pipe(
//     scan((a, _) => ++a, 0),
//     // tap(val => console.log(val)),
//     // restart counter on every click
//     mergeMap(
//       // project
//       val => {
//         // console.log(val);
//         return interval(1000).pipe(
//           tap(val1 => console.log(val))
//         )
//       }
//     )
//   )
//   .subscribe();

// {
//   "name": "ui",
//   "version": "0.0.0",
//   "scripts": {
//   "ng": "ng",
//     "start": "ng serve --port 4201 --proxy-config proxy.conf.js",
//     "start-testing": "ng serve --host 0.0.0.0 --proxy-config proxy-testing.conf.js",
//     "watch": "ng build  --watch --output-hashing=bundles",
//     "build": "ng build",
//     "prod": "ng build --configuration production",
//     "test-run": "ng test --browsers ChromeHeadless",
//     "test-debug": "ng test --browsers ChromeDebugging",
//     "test-ci": "ng test --progress false --watch false --browsers ChromeHeadlessNoSandbox",
//     "backend": "dotnet run --project ../Src/Sfs.Internal.WebApi/Sfs.Internal.WebApi.csproj"
// },
//   "private": true,
//   "dependencies": {
//   "@angular/animations": "^17.1.0",
//     "@angular/cdk": "^17.1.0",
//     "@angular/common": "^17.1.0",
//     "@angular/compiler": "^17.1.0",
//     "@angular/core": "^17.1.0",
//     "@angular/forms": "^17.1.0",
//     "@angular/localize": "^17.1.0",
//     "@angular/material": "^17.1.0",
//     "@angular/material-luxon-adapter": "^17.1.0",
//     "@angular/platform-browser": "^17.1.0",
//     "@angular/platform-browser-dynamic": "^17.1.0",
//     "@angular/router": "^17.1.0",
//     "@angular/service-worker": "^17.1.0",
//     "@microsoft/signalr": "^7.0.10",
//     "@ng-select/ng-select": "^12.0.6",
//     "ajv": "^8.12.0",
//     "file-saver": "^2.0.5",
//     "lodash-es": "^4.17.21",
//     "luxon": "^3.2.1",
//     "moment": "^2.29.4",
//     "ngx-dropzone": "^3.1.0",
//     "ngx-mask": "^16.4.2",
//     "ngx-print-element": "^2.1.4",
//     "ngx-toastr": "^16.0.0",
//     "rxjs": "^7.8.0",
//     "tslib": "^2.5.0",
//     "zone.js": "^0.14.3"
// },
//   "devDependencies": {
//   "@angular-devkit/build-angular": "^17.1.0",
//     "@angular/cli": "^17.1.0",
//     "@angular/compiler-cli": "^17.1.0",
//     "@types/file-saver": "^2.0.5",
//     "@types/jasmine": "^4.3.1",
//     "@types/lodash-es": "^4.17.7",
//     "@types/luxon": "^3.2.0",
//     "@typescript-eslint/eslint-plugin": "^5.52.0",
//     "@typescript-eslint/parser": "^5.52.0",
//     "eslint": "^8.34.0",
//     "eslint-config-prettier": "^8.6.0",
//     "eslint-plugin-html": "^7.1.0",
//     "eslint-plugin-prettier": "^4.2.1",
//     "jasmine-core": "^4.5.0",
//     "karma": "^6.4.1",
//     "karma-chrome-launcher": "^3.1.1",
//     "karma-coverage-istanbul-reporter": "^3.0.3",
//     "karma-jasmine": "^5.1.0",
//     "karma-jasmine-html-reporter": "^2.0.0",
//     "prettier": "^2.8.4",
//     "typescript": "^5.3.3"
// }
// }

