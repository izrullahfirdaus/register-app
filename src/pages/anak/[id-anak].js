import {useRouter} from "next/router";
import {loadDetailTamu} from "@/cons/fun";
const Page = () => {
    const {query} = useRouter()
    console.log(query)
    const data = loadDetailTamu("643080f8328f4b470ae3a38a")
    console.log(data)
}

export default Page