import {Dropdown} from "flowbite-react";
import {useEffect, useState} from "react";

const DropdownMenu = ({data, namaAnak, setIdAnak, setIdKepalaKeluarga, idKepalaKeluarga}) => {
    const [selected, setSelected] = useState(0)
    const [idKeluarga, setIdKeluarga] = useState(idKepalaKeluarga)
    const [selectedAnak, setSelectedAnak] = useState("Pilih nama anak")
    const kepalaKeluarga = data.map((kk, index) => {
        const handleSelected = (id, namaKepala) => {
            setSelected(namaKepala)
            setIdKeluarga(id)
            setIdKepalaKeluarga(namaKepala)

        }

        return (
            <Dropdown.Item key={index} onClick={() => handleSelected(kk.idKeluarga, kk.kepalaKeluarga)}>
                {kk.kepalaKeluarga}
            </Dropdown.Item>
        )
    });

    const anak = namaAnak.map((namanya, index) => {
        if(namanya.idKeluarga === idKeluarga) {
            const handleSelectedAnak = (namaAnak) => {
                setSelectedAnak(namaAnak)
                setIdAnak(namaAnak)
            }
            return (
                <Dropdown.Item key={index} onClick={() => handleSelectedAnak(namanya.nama)}>
                    {namanya.nama}
                </Dropdown.Item>
            )
        }
    })

    useEffect(() => {

    }, [selected])
    return (
        <div className="mt-5">
            <div className="mt-5">
                <p className="mt-1 mb-1 max-w-2xl text-sm ">Kepala Keluarga</p>
                <Dropdown
                    label={selected === 0 ? "Pilih nama keluarga" : selected}
                >
                    {kepalaKeluarga}

                </Dropdown>
            </div>
            {selected === 0 ? "" : (
                <div className="mt-5">
                    <p className="mt-1 mb-1 max-w-2xl text-sm ">Nama Anak</p>
                    <Dropdown label={selectedAnak}>
                        {anak}
                    </Dropdown>

                </div>
            )}

        </div>

    )
}

export default DropdownMenu