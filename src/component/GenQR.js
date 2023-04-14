import {Modal} from "flowbite-react";
import {QRCodeCanvas} from "qrcode.react";
import {loadDetailTamu} from "@/cons/fun";
import {useState} from "react";
import loading from "@/pages/static/loading.json"
import Lottie from "lottie-react";
import * as htmlToImage from 'html-to-image'
import {useRef} from "react";

const GenQR = ({id, handleClose}) => {
    const domEl = useRef(null)
    const [data, setData] = useState(null)

    loadDetailTamu(id).then((res) => {
        setData(res)
    })

    const genLink = process.env.NEXT_QR_LINK
    const dataValue = `${genLink}/checkin/${id}`
    const qrCode = (
        <QRCodeCanvas
            value={dataValue}
            id="qrCode"
            level={"H"}
            style={300}
        />
    )

    const checkTamu = (id) => {
        switch (id) {
            case 1:
                return "Keluarga Arsyad"
            case 2:
                return "Keluarga Sanusi"
            case 3:
                return "Keluarga Petta Walenreng"
            case 4:
                return "Keluarga Petta Taba"
            case 5:
                return "Keluarga Pg Lisa"
            case 6:
                return "Keluarga Pg Asseng"
            case 7:
                return "Keluarga Pg Lebbi"
            case 8:
                return "Keluarga Pg Mursida"
            case 9:
                return "Keluarga Zainuddin"
            case 10:
                return "Tamu"
            case 11:
                return "Koordinator"
            case 12:
                return "VIP"
        }
    }

    const handleDownloadQR = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);

        const link = document.createElement("a");
        link.download = `qr-${data.namaTamu}.png`;
        link.href = dataUrl;
        link.click()
    }
    return (
        <>
            <Modal.Header>
                <p className="text-lg font-bold">Generate QR</p>
            </Modal.Header>
            <Modal.Body>
                <div className="grid">
                    {!data ? (
                        <Lottie animationData={loading} loop={true} />
                    ) : (
                        <div id="domEl" ref={domEl} className="grid place-items-center bg-white p-5">
                            <div className="grid place-items-center">
                                <table className="table-auto mx-auto">
                                    <tbody>
                                        <tr>
                                            <td>Nama Tamu</td>
                                            <td>:</td>
                                            <td> <p className="font-bold text-md px-2">{data.namaTamu}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Jenis Tamu</td>
                                            <td>:</td>
                                            <td> <p className="font-bold text-md px-2">{checkTamu(data.keteranganTamu)}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Catatan</td>
                                            <td>:</td>
                                            <td> <p className="font-bold text-md px-2">{data.notes}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-5">
                                {qrCode}
                            </div>
                        </div>

                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="px-4 py-2 bg-gray-400 rounded-lg" onClick={handleClose}>Tutup</button>
                <button className="ml-3 px-4 py-2 bg-blue-500 rounded-lg" onClick={handleDownloadQR}>Download QR</button>

            </Modal.Footer>
        </>
    )

}

export default GenQR