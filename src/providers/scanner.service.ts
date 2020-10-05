import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScannerServiceProvider {
  public contentHeight;
  public delegate: ScannerDelegate;

  public barcodeCapture;
  public session;
  private context;
  private camera;
  private settings;
  private view;
  private overlay;

  constructor(
    private zone: NgZone,
  ) {
    this.context = Scandit.DataCaptureContext.forLicenseKey('YOUR_LICENSE_KEY_IS_NEEDED_HERE');
    this.camera = Scandit.Camera.default;
    this.context.setFrameSource(this.camera);

    this.settings = new Scandit.BarcodeCaptureSettings();

    this.settings.enableSymbologies([
      Scandit.Symbology.EAN13UPCA,
      Scandit.Symbology.EAN8,
      Scandit.Symbology.UPCE,
      Scandit.Symbology.QR,
      Scandit.Symbology.DataMatrix,
      Scandit.Symbology.Code39,
      Scandit.Symbology.Code128,
      Scandit.Symbology.InterleavedTwoOfFive,
    ]);
    this.settings.codeDuplicateFilter = -1;
    this.barcodeCapture = Scandit.BarcodeCapture.forContext(this.context, this.settings);
    this.barcodeCapture.applySettings(this.settings)
    this.barcodeCapture.addListener({
      didScan: (barcodeCapture, session) => {
        if (this.delegate) {
          this.zone.run(() => {
            this.delegate.didScan(barcodeCapture, session);
          })
        }
      },
    });
  }

  public start(): void {
    this.view = Scandit.DataCaptureView.forContext(this.context);
    this.view.connectToElement(document.getElementById('scanner'));
    this.overlay = Scandit.BarcodeCaptureOverlay.withBarcodeCaptureForView(this.barcodeCapture, this.view);
    this.overlay.viewfinder = new Scandit.RectangularViewfinder();
    this.camera.switchToDesiredState(Scandit.FrameSourceState.On);
    this.barcodeCapture.isEnabled = true;
  }

  public resume(): void {
    this.barcodeCapture.isEnabled = true;
  }
  public pause(): void {
    this.barcodeCapture.isEnabled = false;
  }
}