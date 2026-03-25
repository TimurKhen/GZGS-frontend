# __GzgSubscriptions__ _by GZG Team_

Front-end для [Технострелки](https://tehnostrelka52.ru/) 
    [цифровой вызов - Fullstack](https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FkyMYUnZfI5zgDrUEhH1pCU3ce7SURPn7ylVK9G47ncL26Xa2KjeoxvokjBFFCW2gq%2FJ6bpmRyOJonT3VoXnDag%3D%3D%3A%2F%D0%A6%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2.%20%D0%97%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BE%D1%82%D0%B1%D0%BE%D1%80%D0%BE%D1%87%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%8D%D1%82%D0%B0%D0%BF%D0%B0%20%C2%AB%D0%9E%D1%82%D0%B1%D0%BE%D1%80%D0%BE%D1%87%D0%BD%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%A4%D1%83%D0%BB%D1%81%D1%82%D1%8D%D0%BA%C2%BB%202026%20%D0%B3..pdf&name=%D0%A6%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2.%20%D0%97%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BE%D1%82%D0%B1%D0%BE%D1%80%D0%BE%D1%87%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%8D%D1%82%D0%B0%D0%BF%D0%B0%20%C2%AB%D0%9E%D1%82%D0%B1%D0%BE%D1%80%D0%BE%D1%87%D0%BD%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%A4%D1%83%D0%BB%D1%81%D1%82%D1%8D%D0%BA%C2%BB%202026%20%D0%B3..pdf)

Создано благодаря Angular 21.1.2, TaigaUI и Capacitor

Процесс запуска.

Установите зависимости:
```bash
npm install
```

Компиляция и запуск веб версии:
---
## Dev

```bash
ng serve
```

Сервер будет запущен на `http://localhost:4200/`.

## Build 

Для билда проекта:

```bash
npm run build
```

Необходимо установить angular-http-server.

```bash
npm install -g angular-http-server
```

Перейдите в папку с приложением 
``` bash
cd dist/gzg-money/browser
``` 
Запустите
``` bash
angular-http-server --open
```

Компиляция и запуск версии под телефоны:
---

Если `capacitor` не установлен:

``` bash
npm install @capacitor/core @capacitor/cli
```

Инициализируйте capacitor, если он не инициализирован
``` bash 
npx cap init
```
Рекомендуемое название: `gzgs` <br>
(дальше просто нажимать enter)

Вставьте в capacitor.config.ts
```
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'gzg-money',
  webDir: 'dist/gzg-money/browser'
};

export default config;
```

## Android
`Необходимо иметь android studio`

``` bash
npx cap add android
```

``` bash
ng build
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

`Дальше компиляция через android studio.`


## IOS
`Необходимо иметь mac и XCode`
Необходимо запускать команды из sudo.

``` bash
npm install @capacitor/ios
```


``` bash
brew install cocoapods
```

``` bash
npx cap add ios
```

``` bash
ng build
```

``` bash
npx cap copy
```

``` bash
npx cap sync ios
```

``` bash
npx cap open ios
```

`Дальше компиляция через Xcode.`
