import {useRouter} from "next/router";
const Page = () => {
    const {query} = useRouter()
    console.log(query)
}

export default Page