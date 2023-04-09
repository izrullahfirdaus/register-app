import {Button, Modal} from "flowbite-react";
import { QRCodeCanvas} from "qrcode.react";
import {useState} from "react";

const GenerateQR = ({open, handleClose, idAnak, idKepalaKeluarga}) => {
    const dataValue = `Ini Keluarga ${idKepalaKeluarga}, atas nama: ${idAnak}`

    const qrCode = (
        <QRCodeCanvas
            value={dataValue}
            id="qrCode"
            size={300}
            level={"H"}
        />
    )
    return (
        <Modal className="h-screen p-5" show={open} onClose={handleClose}>
            <Modal.Header>
                QR Code
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6 p-5">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Harap Simpan QR Code anda dengan capture screen ini untuk registrasi
                    </p>
                    <h5>Kepala Keluarga: {idKepalaKeluarga}</h5>
                    <h5>Kepala Keluarga: {idAnak}</h5>
                    {qrCode}
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="p-5">
                    <Button
                        color="gray"
                        onClick={() => handleClose()}
                    >
                        Decline
                    </Button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}

export default GenerateQR