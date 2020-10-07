import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('deviceready', bootstrap, false);

function bootstrap() {
  console.log('device is ready...');
  // // @ts-ignore
  // console.log(cordova.plugins);
  // @ts-ignore
  // console.log(ScanditCaptureCore);

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}
