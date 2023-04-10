export const apiUrl = process.env.NEXT_API_URL
export const loadDetailTamu = async (id) => {
    const res = await fetch(`${apiUrl}/tamu/${id}`)
    const {message} = await res.json()

    return message
}