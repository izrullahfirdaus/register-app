import {thead} from "@/cons/nama";
import {Button, Table} from "flowbite-react";
import {useEffect, useState} from "react";
import CustomModal from "@/component/CustomModal";

export const apiURL = process.env.NEXT_API_URL

const Registrasi = ({daftarTamu}) => {
    const [open, setOpen] = useState(false);
    const [openQr, setOpenQr] = useState(false);
    const [idTamu, setIdTamu] = useState(null);
    const [condition, setCondition] = useState(null);
    const handleOpen = (condition) => {
        setOpen(true)
        setCondition(condition)
    };
    const handleClose = () => {
        setOpen(false)
        setCondition(null)
    }

    const handleCloseQr = () => setOpenQr(false)


    const tableHead = thead.map((th, index) => {
        return (
            <Table.HeadCell key={index}>
                {th}
            </Table.HeadCell>
        )
    });

    const data = daftarTamu.message
    console.log(condition)


    const tamu = data.map((dataTamu, index) => {
        const checkUndian = (undian) => {
            if(undian === true) {
                return "Dapat"
            } else {
                return "Tidak Dapat"
            }
        }

        const checkTamu = (id) => {
            switch (id) {
                case 1:
                    return "Tamu"
                case 2:
                    return "Keluarga Arsyad"
                case 3:
                    return "Keluarga Zainuddin"
                case 4:
                    return "Koordinator"
                case 5:
                    return "Pengurus Panti"
            }
        }

        const handleQr = (id) => {
            setOpen(true)
            setIdTamu(id)
            setCondition("generate-qr")
        }

        const checkCheckIn = (statusCheckIn) => {
            if(statusCheckIn === true) {
                return "Sudah Check In"
            } else {
                return "Belum Check In"
            }
        }
        return (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {dataTamu.namaTamu}
                </Table.Cell>
                <Table.Cell>
                    {checkUndian(dataTamu.undianUmroh)}
                </Table.Cell>
                <Table.Cell>
                    {checkTamu(dataTamu.keteranganTamu)}
                </Table.Cell>
                <Table.Cell>
                    {checkCheckIn(dataTamu.statusCheckin)}
                </Table.Cell>
                <Table.Cell>

                    <button className="rounded-md p-3 bg-red-500 mx-1 text-white">Delete</button>
                    <button className="rounded-md p-3 bg-green-500 mx-1 text-white" onClick={() => handleQr(dataTamu._id)}>QR Code</button>
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <div className="grid h-screen place-items-center sm:px-5">
            <div className=" h-3/4 bg-white shadow rounded-lg overflow-scroll">
                <div className="grid gap-4 mt-3">
                    <div>
                        <p className="text-center font-bold">Daftar Tamu</p>
                    </div>
                    <div className="flex justify-end mr-5">
                        <button className="px-4 py-2 rounded-md bg-blue-500 text-white" onClick={() => handleOpen("new-user")}>Tambah Nama Tamu</button>
                    </div>
                    <div className="p-5">
                        <Table hoverable={true} >
                            <Table.Head>
                                {tableHead}
                                <Table.HeadCell>
                                    <span className="sr-only">
                                        Edit
                                    </span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {tamu}
                            </Table.Body>
                        </Table>
                    </div>
                    <CustomModal idTamu={idTamu} condition={condition} open={open} handleCLose={handleClose} />
                </div>

            </div>
        </div>
    )
}
export async function getStaticProps(){

    const res = await fetch(`${apiURL}/tamu`);
    const daftarTamu = await res.json()

    return {
        props: {
            daftarTamu: daftarTamu,

        }
    }
}
export default Registrasi