import Lottie from "lottie-react";
import failed from '../static/failed.json'
import process from '../static/process.json'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import loading from '../static/loading.json'
const Checkin = () => {
    const apiURL = process.env.NEXT_API_URL
    const {query} = useRouter()
    const router = useRouter()
    const [data, setData] = useState(null)
    const id = query.id
    const [isLoading, setIsLoading]=useState(false)

    const btnIzinkan = "bg-green-500 text-white rounded-md px-4 py-2 mr-4"
    const btnProcess = "bg-green-500 text-white rounded-md px-4 py-2 mr-4 opacity-50"

    const detailTamu = (id) => {
        console.log("Fetching id ini cuy",id)
        fetch(`${apiURL}/tamu/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.message)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
                return "Keluarga Te Murni"
            case 11:
                return "Keluarga Maros"
            case 12:
                return "Keluarga Maccini"
            case 13:
                return "Keluarga Ali Akbar"
            case 14:
                return "Keluarga Dg Gassing"
            case 15:
                return "Keluarga Dato  Sikki"
            case 16:
                return "Keluarga Dato Liang"
            case 17:
                return "Keluarga Cucu Dato Liang"
            case 18:
                return "Keluarga Dato Soleh"
            case 19:
                return "Keluarga Dato Intang"
            case 20:
                return "Keluarga Cucu Dato Bau"
            case 21:
                return "Keluarga Dato Intan"
            case 22:
                return "Keluarga Dato Cenga"
            case 23:
                return "Keluarga Om Tiro"
            case 24:
                return "Keluarga Om Nasir Te Yuyu"
            case 25:
                return "Keluarga Om Jonny"
            case 26:
                return "Keluarga Te Murni"
            case 27:
                return "Keluarga Zainal Abidin"
            case 28:
                return "Keluarga Syarifuddin"
            case 29:
                return "Keluarga Asdiana"
            case 30:
                return "Keluarga Erny Mailangkay"
            case 31:
                return "Keluarga Om Indar"
            case 32:
                return "Keluarga Yunus dg Manasa"
            case 33:
                return "Tamu"
            case 34:
                return "VIP"
            case 35:
                return "Pengurus Panti"

        }
    }


    useEffect(() => {

        detailTamu(id)
    }, [id])


    const updateCheckin = async (id) => {
        await fetch(`${apiURL}/tamu/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                statusCheckin: true
            }),
            headers: {
                "content-type": "application/json",
            },
        }).catch((err) => {
            console.log(err)
        })
        router.push(`/success/${id}`)
    }
    const handleProcess = async (id) => {

        updateCheckin(id)

        // router.push(`/success/${id}`)

    }



    return(
        <div className="grid h-screen place-items-center sm:px-5">
            <div className="h-3/4 w-3/4 bg-white shadow rounded-lg overflow-hidden">
                {!data ? (
                    <Lottie animationData={loading} loop={true} />
                ) : (
                    <div className="grid gap-4 mt-3 p-4">
                        <div>
                            <h3 className="text-center font-bold text-gray-600 text-lg px-2">
                                Check In Tamu
                            </h3>
                        </div>
                        <div className="items-center">
                            {data.statusCheckin ? (
                                <Lottie animationData={failed} loop={true} width={20} height={50}/>
                            ) : (
                                <Lottie animationData={process} loop={true} className="w-50 h-50"/>
                            )}
                        </div>
                        <div className="text-center text-lg px-2">
                            {data.statusCheckin ? (
                                <div>Tamu atas nama <p className="text-red-400 font-bold">{data.namaTamu}</p> udah pernah check in</div>
                            ) : (
                                <table className="table-auto mx-auto text-left pl-1">
                                    <tbody>
                                    <tr>
                                        <td className="text-sm">Nama Tamu</td>
                                        <td className="text-sm pl-1">:</td>
                                        <td> <p className="font-bold text-sm px-2">{data.namaTamu}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm">Jenis Tamu</td>
                                        <td className="text-sm pl-1">:</td>
                                        <td> <p className="font-bold px-2 text-sm">{checkTamu(data.keteranganTamu)}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm">Catatan</td>
                                        <td className="text-sm pl-1">:</td>
                                        <td> <p className="font-bold px-2 text-sm">{data.notes}</p></td>
                                    </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {data.statusCheckin ? "" : (
                            <div className="flex flex-row justify-center">
                                <button className={isLoading === true ? btnProcess : btnIzinkan} disabled={isLoading} onClick={() => {
                                    setIsLoading(true)
                                    handleProcess(data._id)
                                }}>
                                    {isLoading === true ? "Loading" : "Izinkan"}
                                </button>
                                <button className="bg-red-500 text-white rounded-md px-4 py-2">Tolak</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Checkin