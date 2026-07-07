import { useEffect, useState } from "react";
import { Contragent } from "../../../entities/contragent";

type ModalData = Omit<Contragent, "id">;

type Props = {
    contragent: Contragent | null;
    onSave: (modalData: ModalData) => void;
    onCancel: () => void;
};

export function ContragentModal({ contragent, onSave, onCancel }: Props) {
    const [name, setName] = useState("");
    const [inn, setInn] = useState("");
    const [address, setAddress] = useState("");
    const [kpp, setKpp] = useState("");

    useEffect(() => {
        if (contragent) {
            setName(contragent.name);
            setInn(contragent.inn);
            setAddress(contragent.address);
            setKpp(contragent.kpp);
        } else {
            setName("");
            setInn("");
            setAddress("");
            setKpp("");
        }
    }, [contragent]);

    function saveModal() {
        onSave({
            name,
            inn,
            address,
            kpp
        });
    }

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/30"
        >
            <div className="relative w-full max-w-[26rem] max-h-full">
                <div className="relative bg-white border rounded-lg">
                    <div className="flex items-center justify-between border-b px-5 py-3">
                        <h3 className="text-xl font-semibold">
                            Контрагент
                        </h3>
                    </div>

                    <div className="px-5 py-5">
                        <div>
                            <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">
                                Наименование
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full"
                                required/>
                        </div>

                        <div className="pt-4">
                            <label htmlFor="inn" className="block mb-2.5 text-sm font-medium text-heading">
                                ИНН
                            </label>
                            <input
                                type="text"
                                id="inn"
                                value={inn}
                                onChange={(event) => setInn(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full"
                                required/>
                        </div>

                        <div className="pt-4">
                            <label htmlFor="address" className="block mb-2.5 text-sm font-medium text-heading">
                                Адрес
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full"
                                required/>
                        </div>

                        <div className="pt-4">
                            <label htmlFor="kpp" className="block mb-2.5 text-sm font-medium text-heading">
                                КПП
                            </label>
                            <input
                                type="text"
                                id="kpp"
                                value={kpp}
                                onChange={(event) => setKpp(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg w-full"
                                required
                            />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={saveModal}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                                Сохранить
                            </button>

                            <button
                                type="button"
                                onClick={onCancel}
                                className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}