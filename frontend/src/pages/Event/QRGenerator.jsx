// frontend/src/pages/Event/QRGenerator.jsx
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { generateQR } from "../../services/qrService";

const QRGenerator = ({ eventId }) => {
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        const data = await generateQR(eventId); // Call to /api/qr_codes/generate
        setQrData(data.url);
      } catch (err) {
        setError(err);
        console.error("Error generating QR code:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQR();
  }, [eventId]);

  if (loading) {
    return <div>Generating QR code...</div>;
  }

  if (error) {
    return <div>Error generating QR code: {error.message}</div>;
  }

  return (
    <div>
      {qrData ? (
        <QRCode value={qrData} size={256} />
      ) : (
        <div>No QR code data available.</div>
      )}
    </div>
  );
};

export default QRGenerator;