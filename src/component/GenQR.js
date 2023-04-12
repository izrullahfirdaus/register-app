import {Modal} from "flowbite-react";
import {QRCodeCanvas} from "qrcode.react";
import {loadDetailTamu} from "@/cons/fun";
import {useState} from "react";
import loading from "@/pages/static/loading.json"
import Lottie from "lottie-react";

const GenQR = ({id, handleClose}) => {
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
                        <Lottie animationData={loading} loop={true} />
                    ) : (
                        <>
                            <div className="place-items-center">
                                <table className="table-auto mx-auto">
                                    <tbody>
                                        <tr>
                                            <td>Nama Tamu</td>
                                            <td>:</td>
                                            <td> <p className="font-bold text-md px-2">{data.namaTamu}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Catatan</td>
                                            <td>:</td>
                                            <td> <p className="font-bold text-md px-2">{data.notes}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mx-auto mt-5">
                                {qrCode}
                            </div>
                        </>

                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="px-4 py-2 bg-gray-400 rounded-lg" onClick={handleClose}>Tutup</button>
            </Modal.Footer>
        </>
    )

}

export default GenQR