import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { registerLocaleData } from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { authTokenInterceptor } from "./services/api/user-api/auth.interceptor";


registerLocaleData(localeRu)

export const appConfig: ApplicationConfig = {
  providers: [
        provideAnimations(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideEventPlugins(),
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideEventPlugins(),
        
        { provide: LOCALE_ID, useValue: 'ru' }
    ]
}
