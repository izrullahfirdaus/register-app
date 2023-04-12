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
            <div className="h-3/4 w-3/4 bg-white shadow rounded-lg overflow-hidden px-5">
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
                            ) : (<div>Tamu atas nama <p className="text-green-400 font-bold">{data.namaTamu}</p> mau check in</div>)}
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