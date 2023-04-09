import {useState} from "react";
import {QrReader} from 'react-qr-reader';
const Scan = () => {

    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [data, setData] = useState("");

    const btnStartScan = <button className="px-4 py-2 bg-blue-500 text-white" onClick={() => setStartScan(true)}>Start Scan</button>
    const btnStopScan = <button className="px-4 py-2 bg-blue-500 text-white" onClick={() => setStartScan(false)}>Cancel Scan</button>

    const handleScan = async (scanData) => {
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
            console.log(`loaded >>>`, scanData);
            setData(scanData);
            setStartScan(false);
            // setLoadingScan(false);
            // setPrecScan(scanData);
        }
    }

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <>
            <h2 className="text-center">
                Scan Tamu Undangan
            </h2>
            <div className="grid mt-5">
                <div>
                    {!startScan ? btnStartScan : btnStopScan}
                </div>
                <div>
                    {startScan && (
                        <>
                            <QrReader
                                facingMode="environment"
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: "300px" }}
                            />
                        </>
                    )}
                </div>
                {data}
            </div>
        </>
    )
}

export default Scan