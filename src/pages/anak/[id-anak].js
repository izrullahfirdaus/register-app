import {useRouter} from "next/router";
import {loadDetailTamu} from "@/cons/fun";
import * as htmlToImage from 'html-to-image';
import {useRef} from "react";

const Page = () => {
    const domEl = useRef()


    const handleDownload = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);

        const link = document.createElement("a");
        link.download = `undangan-123.png`
        link.href=  dataUrl
        link.click()
    }

    return (
        <>
            <button onClick={handleDownload}>Download png</button>
            <div className="h-screen grid place-items-center" id="domEl" ref={domEl}>
                <div className="h-3/4 w-3/4 bg-red-400">
                    <h4 className="text-white text-lg">
                        Coba coba download jpg
                    </h4>
                    <h4>Pake id</h4>
                </div>
            </div>
        </>
    )
}

export default Page