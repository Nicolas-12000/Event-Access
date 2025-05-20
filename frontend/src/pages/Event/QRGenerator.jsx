// frontend/src/pages/Event/QRGenerator.jsx
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { generateQR, getQRDetails } from "../../services/qrService";

const QRGenerator = ({ eventId, identityDocument }) => {
  const [qrId, setQrId] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQR = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Generar el QR y obtener el qrId
        const qrResponse = await generateQR(identityDocument, eventId);
        setQrId(qrResponse.qrId);

        // 2. Obtener los detalles del QR (incluye la imagen)
        const qrDetails = await getQRDetails(qrResponse.qrId);
        // qrImage es un array de bytes, conviértelo a base64
        const base64Image = `data:image/png;base64,${btoa(
          String.fromCharCode(...new Uint8Array(qrDetails.qrImage.data))
        )}`;
        setQrImage(base64Image);
      } catch (err) {
        setError(err);
        console.error("Error generating QR code:", err);
      } finally {
        setLoading(false);
      }
    };
    if (eventId && identityDocument) {
      fetchQR();
    }
  }, [eventId, identityDocument]);

  const handleDownload = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `qr_event_${eventId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Generating QR code...</div>;
  }

  if (error) {
    return <div>Error generating QR code: {error.message}</div>;
  }

  return (
    <div>
      {qrImage ? (
        <>
          <img src={qrImage} alt="QR Code" style={{ width: 256, height: 256 }} />
          <div style={{ marginTop: 10 }}>
            <button onClick={handleDownload}>Download QR</button>
          </div>
        </>
      ) : (
        <div>No QR code data available.</div>
      )}
    </div>
  );
};

export default QRGenerator;