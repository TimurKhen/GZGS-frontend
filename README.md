# GzgMoney

This project was created by Angular 21.1.2

Run
```bash
npm install
```

How to compile and run web version:
---
## Development server

To start a local dev server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Building

To build the project run:

```bash
ng build
```

After you need to install http server.

```bash
npm install -g angular-http-server
```

go to compiled app by
``` bash
cd dist/gzg-money/browser
``` 
and run
``` bash
angular-http-server
```

This will compile your project and store the build artifacts in the `dist/` directory.


How to compile and run android version:
---
`You need installed Android Studio`

Install capacitor if it isn't installed 

``` bash
npm install @capacitor/core @capacitor/cli
```

``` bash
npx cap init GZGS
```

``` bash
npx cap add android
```

``` bash
ng build --prod
```

``` bash
npx cap copy
```

``` bash
npx cap sync
```

``` bash
npx cap open android
```

`After you need to compile app your self.`