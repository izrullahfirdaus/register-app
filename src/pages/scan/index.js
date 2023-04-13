import {useState} from "react";
import {QrReader} from "react-qr-reader";
import {useRouter} from "next/router";

const Scan = () => {
    const router = useRouter()

    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [data, setData] = useState("");

    const btnStartScan = <button className="px-4 py-2 bg-blue-500 text-white mx-auto rounded-lg" onClick={() => setStartScan(true)}>Start Scan</button>
    const btnStopScan = <button className="px-4 py-2 bg-blue-500 text-white mx-auto rounded-lg" onClick={() => setStartScan(false)}>Cancel Scan</button>

    if (data) {
        router.push(data)
    }
    const handleScan = async (scanData) => {
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
            alert(scanData)
            console.log(`loaded >>>`, scanData);
            setData(scanData);
            setStartScan(false);
            alert(scanData)
            setLoadingScan(false);
        }
    }

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="grid h-screen place-items-center sm:px-5">
            <div className="h-3/4 w-3/4 bg-white shadow rounded-lg">
                <h2 className="text-center font-bold mt-5">
                    Scan Tamu Undangan
                </h2>
                <div className="grid mt-5">
                    <div className="mx-auto">
                        {!startScan ? btnStartScan : btnStopScan}
                    </div>
                    <div>

                    </div>
                    <div>
                        {startScan && (
                            <div className="px-4">
                                <QrReader
                                    constraints={{facingMode: 'environment'}}
                                    onError={handleError}
                                    onScan={handleScan}
                                />
                            </div>
                        )}
                    </div>
                    <h1>
                        {data}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Scan