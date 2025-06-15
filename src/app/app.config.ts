import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingscreenInterceptor } from './core/interceptors/loadingscreen.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  // withViewTransitions() دى بتخلى الراوتنج يحصل بنعومه
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        errorInterceptor,
        loadingscreenInterceptor,
      ])
    ),
    importProvidersFrom(
      NgxSpinnerModule,

      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideAnimations(),
    provideToastr(),
  ],
};
