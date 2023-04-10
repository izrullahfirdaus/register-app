import {Modal} from "flowbite-react";
import {QRCodeCanvas} from "qrcode.react";
import {loadDetailTamu} from "@/cons/fun";
import {useEffect, useState} from "react";

const GenQR = ({id, handleClose}) => {
    const [data, setData] = useState(null)

    loadDetailTamu(id).then((res) => {
        setData(res)
    })

    // console.log(id)

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
                    {!data ? (
                        <h3>Loading pak....</h3>
                    ) : (
                        <div>
                            <p className="text-center text-md">Nama Tamu: </p><p className="font-bold text-md">{data.namaTamu}</p>

                        </div>
                    )}

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