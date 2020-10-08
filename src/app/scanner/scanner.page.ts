import { Component } from '@angular/core';

import { ScannerServiceProvider } from 'src/providers/scanner.service';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.page.html',
  styleUrls: ['scanner.page.scss'],
})
export class ScannerPage {
  private barcodes: Barcode[] = [];
  private continuousMode: boolean = false;
  
  showSingleButton: boolean = true;
  showSingleDoneButton: boolean = false;

  constructor(private scanner: ScannerServiceProvider) {}

  public startScanning() {
    this.showScanner();
    this.showSingleButton = false;
    this.showSingleDoneButton = false;
    this.scanner.delegate = this;
    this.scanner.start();
  }

  public startContinuousScanning() {
    this.continuousMode = true;
    document.getElementById('scanner').style.bottom = "10%";
    this.startScanning();
  }

  public resumeScanning() {
    this.scanner.resume();
    this.showScanner();
    this.showSingleButton = false;
    this.showSingleDoneButton = false;
  }

  public doneSingle() {
    this.hideScanner();
    this.scanner.pause();
    this.barcodes = [];
    document.getElementById('result').innerHTML = "";
    this.showSingleButton = true;
    this.showSingleDoneButton = false;
  }

  public done() {
    this.barcodes = [];
    document.getElementById('result').style.display = "none";
    document.getElementById('result').innerHTML = "";
    this.showSingleButton = true;
    this.showSingleDoneButton = false;
    this.continuousMode = false;
  }

  public didScan(barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession) {
    this.barcodes = session.newlyRecognizedBarcodes;
    this.hideScanner();
    document.getElementById('result').style.display = "block";
    this.scanner.pause();
    this.showSingleDoneButton = true;
    let scannedBarcode = "Scanned Code:<br><br>" + this.barcodes[0].symbology.toUpperCase() + ": " + this.barcodes[0].data;
    document.getElementById('result').innerHTML = scannedBarcode;
  }

  public ionViewDidEnter(): void {
  }

  public showScanner() {
    document.getElementById('scanner').style.display = "block";
    document.getElementById('result').style.display = "none";
    document.getElementById('result').innerHTML = "";
  }

  public hideScanner() {
    document.getElementById('scanner').style.display = "none";
  }
}
