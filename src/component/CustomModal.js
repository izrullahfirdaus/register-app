import {useState} from "react";
import {keteranganTamu} from "@/cons/nama";
import {Label, Modal, TextInput, Dropdown} from "flowbite-react";
import {useRouter} from "next/router";
import {Formik, Field, Form} from "formik";
import GenQR from "@/component/GenQR";

export const initialTamu = {
    namaTamu: "",
    undianUmroh: false,
    undianDoorPrize: false,
    keteranganTamu: 0,
    notes: "",
    statusCheckin: false,
    umur: 0

}
export const styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field:
        'bg-white  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button:
        ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
    errorMsg: 'text-red-500 text-sm',
}

const CustomModal = ({open, handleCLose, condition, idTamu}) => {
    const apiUrl = process.env.NEXT_API_URL
    const router = useRouter()
    const [dataTamu, setDataTamu] = useState(null)

    const addData = (dataTamu) => {
        console.log("cuy",dataTamu)
        fetch(`${apiUrl}/tamu`, {
            method: "POST",
            body: JSON.stringify(dataTamu),
            headers: {
                "content-type": "application/json",
            },
        }).catch((err) => {
            console.log(err)
        })
    }

    const [idKeluarga, setIdKeluarga] = useState(null)
    const [selectedDropdown, setSelectedDropdown] = useState("Pilih Jenis Tamu")
    const [jenisUmur, setJenisUmur] = useState(0)
    const [selectedUmur, setSelectedUmur] = useState("Pilih Umur")

    const handleSelectedDropdown = (id, keterangan) => {
        setIdKeluarga(id)
        setSelectedDropdown(keterangan)
    }

    const dropdownItem = keteranganTamu.map((tamu, index) => {
        return (
            <Dropdown.Item key={index} onClick={() => handleSelectedDropdown(tamu.id, tamu.keterangan)}>
                {tamu.keterangan}
            </Dropdown.Item>
        )
    })

    return (
        <Modal show={open} onClose={handleCLose}>
            {condition === "new-user" && (
                <Formik initialValues={initialTamu} onSubmit={(values, {setSubmitting, resetForm}) => {
                    const data = {...values, keteranganTamu: idKeluarga, umur: jenisUmur}
                    setTimeout(() => {
                        setDataTamu({...values, keteranganTamu: idKeluarga, umur: jenisUmur})
                        addData(data)
                        setSubmitting(false);
                        resetForm({values: ''})
                        setSelectedDropdown("Pilih Jenis Tamu")
                        setSelectedUmur("Pilih Umur")
                        handleCLose()
                    }, 400)
                }}>
                    {({isSubmitting, values}) => (
                        <Form>
                            <Modal.Header>
                                <p className="text-md">Buat Tamu Baru</p>
                            </Modal.Header>
                            <Modal.Body>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="namaTamu"
                                            value="Nama Tamu"
                                        />
                                    </div>
                                    <Field className={styles.field} type="namaTamu" name="namaTamu" placeholder="Nama Tamu"/>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <legend>
                                            Undian Umroh
                                        </legend>
                                        <Field component="div" name="undianUmroh">
                                            <input
                                                type="radio"
                                                id="radioOne"
                                                defaultChecked={values.undianUmroh === true}
                                                name="undianUmroh"
                                                value={true}
                                                className="mr-1"

                                            />
                                            <label htmlFor="radioOne" className="mr-3">Dapat</label>

                                            <input
                                                type="radio"
                                                id="radioTwo"
                                                defaultChecked={values.undianUmroh === false}
                                                name="undianUmroh"
                                                value={false}
                                                className="mr-1"
                                            />
                                            <label htmlFor="radioTwo">Tidak Dapat</label>
                                        </Field>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <legend>
                                            Undian Doorprize
                                        </legend>
                                        <Field component="div" name="undianDoorPrize">
                                            <input
                                                type="radio"
                                                id="radioOne"
                                                defaultChecked={values.undianDoorPrize === true}
                                                name="undianDoorPrize"
                                                value={true}
                                                className="mr-1"

                                            />
                                            <label htmlFor="radioOne" className="mr-3">Dapat</label>

                                            <input
                                                type="radio"
                                                id="radioTwo"
                                                defaultChecked={values.undianDoorPrize === false}
                                                name="undianDoorPrize"
                                                value={false}
                                                className="mr-1"
                                            />
                                            <label htmlFor="radioTwo">Tidak Dapat</label>
                                        </Field>
                                    </div>
                                </div>
                                <div>
                                    <Dropdown label={selectedDropdown}>
                                        {dropdownItem}
                                    </Dropdown>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="notes"
                                            value="Catatan"
                                        />
                                    </div>
                                    <Field className={styles.field} type="namaTamu" name="notes" placeholder="Catatan"/>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="umur"
                                            value="Umur"
                                        />
                                    </div>
                                    <Dropdown label={selectedUmur}>
                                        <Dropdown.Item onClick={() =>{
                                            setJenisUmur(1)
                                            setSelectedUmur("Anak")
                                        }
                                        }>Anak</Dropdown.Item>
                                        <Dropdown.Item onClick={() =>{
                                            setJenisUmur(2)
                                            setSelectedUmur("Dewasa")
                                        }
                                        }>Dewasa</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="p-5 flex flex-row">
                                    <button className="px-4 mr-2 py-2 rounded-md border-2 border-gray-100" onClick={() => handleCLose()}>Cancel</button>
                                    <button className="px-4 py-2 rounded-md bg-blue-500 text-white" type="submit" disabled={isSubmitting}>Tambah</button>
                                </div>

                            </Modal.Footer>
                        </Form>
                    )}

                </Formik>
            )}

            {condition === "generate-qr" &&  (
                <GenQR id={idTamu} handleClose={handleCLose} />
            )}


        </Modal>
    )
}

export default CustomModal