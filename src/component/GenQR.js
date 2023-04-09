import {Modal} from "flowbite-react";
import {QRCodeCanvas} from "qrcode.react";

const GenQR = ({id, handleClose}) => {
    const genLink = process.env.NEXT_QR_LINK
    const dataValue = `${genLink}/checkin/${id}`
    const qrCode = (
        <QRCodeCanvas
            value={dataValue}
            id="qrCode"
            size={300}
            level={"H"} />

    )
    return (
        <>
            <Modal.Header>
                <p className="text-lg font-bold">Generate QR</p>
            </Modal.Header>
            <Modal.Body>
                <div className="grid">
                    <div>
                        <p className="text-center">Ini qr nya dengan id: {id}</p>
                    </div>
                    <div>
                        {qrCode}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="px-4 py-2 bg-gray-400 rounded-lg" onClick={handleClose}>Tutup</button>
            </Modal.Footer>
        </>
    )

}

export default GenQR