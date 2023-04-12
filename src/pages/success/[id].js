import Lottie from "lottie-react";
import success from "@/pages/static/success.json";
import failed from "@/pages/static/failed.json";
import process from "@/pages/static/process.json";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {error} from "next/dist/build/output/log";

const Page = () => {
    const apiURL = process.env.NEXT_API_URL
    const {query} = useRouter()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const id = query.id
    const url = `${apiURL}/tamu/${id}`

    useEffect(() => {
        setLoading(true)
        const urlSearchParams = url
        console.log("ini url dr effect", urlSearchParams)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data.message)
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [url])

    return (
        <div className="grid h-screen place-items-center sm:px-5">
            <div className="h-3/4 w-3/4 bg-white shadow rounded-lg overflow-hidden px-5">
                <div className="grid gap-4 mt-3 p-4">
                    {loading ? (
                        <div>
                            <Lottie animationData={process} loop={true}/>
                        </div>
                    ) : (
                        <div>
                            {!data ? (
                                <Lottie animationData={failed} loop={true} />
                            ) : (
                                <div className="grid">
                                    <Lottie className="mx-auto" animationData={success} loop={true} />
                                </div>

                            )}

                        </div>
                    )}


                    {loading ? "" : (
                        <div className="text-center">
                            <p>{!data ? "Tidak ada tamu dengan id tersebut" : `Sukses silahkan masuk ${data.namaTamu}`}</p>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default Page