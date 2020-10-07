import { Component } from '@angular/core';

import { ScannerServiceProvider } from 'src/providers/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scanner: ScannerServiceProvider) {}


  get scanditKeys() {
    // @ts-ignore
    return Object.keys(window.Scandit);
  }
}
