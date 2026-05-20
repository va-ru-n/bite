import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { AlertTriangle } from "lucide-react";

const BarcodeScanner = ({ onDetected }) => {
  const [stopStream, setStopStream] = useState(false);
  const [cameraError, setCameraError] = useState("");

  return (
    <div className="section-shell overflow-hidden">
      <div className="mb-4">
        <h3 className="font-display text-xl font-semibold">Live Barcode Scanner</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Point the camera at a product barcode for instant nutrition lookup.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 dark:border-slate-800">
        <BarcodeScannerComponent
          width="100%"
          height={320}
          stopStream={stopStream}
          onUpdate={(error, result) => {
            if (error?.message?.toLowerCase().includes("permission")) {
              setCameraError("Camera permission was denied. Please allow camera access.");
            }

            const scannedCode = result?.text;
            if (scannedCode) {
              setStopStream(true);
              onDetected(scannedCode);
            }
          }}
        />
      </div>

      {cameraError ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>{cameraError}</p>
        </div>
      ) : null}

      <button type="button" className="btn-secondary mt-4" onClick={() => setStopStream(false)}>
        Scan again
      </button>
    </div>
  );
};

export default BarcodeScanner;
