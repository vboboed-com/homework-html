import { useState } from "react";
import { Contragent } from "./entities/contragent";
import { ContragentTable } from "./components/tables/contragent/ContragentTable";
import { ContragentModal } from "./components/modals/contragent/ContragentModal";
import logo from "./assets/logo.png";
import addIcon from "./assets/add-icon.png";

export function App() {
    const [contragents, setContragents] = useState<Contragent[]>([
        new Contragent(1, "МойКонтрагент", "12345678901", "Витебск", "123456789")
    ]);

    const [editingContragentId, setEditingContragentId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editingContragent = contragents.find(
        (item) => item.id === editingContragentId
    ) ?? null;

    function fillModal(contragent: Contragent | null) {
        if (contragent) {
            setEditingContragentId(contragent.id);
        } else {
            setEditingContragentId(null);
        }

        setIsModalOpen(true);
    }

    function closeModal() {
        setEditingContragentId(null);
        setIsModalOpen(false);
    }

    function saveContragent(modalData: Omit<Contragent, "id">) {
        if (editingContragentId) {
            setContragents(
                contragents.map((contragent) => {
                    if (contragent.id === editingContragentId) {
                        return new Contragent(
                            contragent.id,
                            modalData.name,
                            modalData.inn,
                            modalData.address,
                            modalData.kpp
                        );
                    }

                    return contragent;
                })
            );
        } else {
            const nextId = contragents.length
                ? Math.max(...contragents.map((el) => el.id)) + 1
                : 1;

            setContragents([
                ...contragents,
                new Contragent(
                    nextId,
                    modalData.name,
                    modalData.inn,
                    modalData.address,
                    modalData.kpp
                )
            ]);
        }

        closeModal();
    }

    function deleteContragent(id: number) {
        setContragents(contragents.filter((item) => item.id !== id));
    }

    return (
        <div className="mx-auto w-[1071px] min-h-screen flex flex-col">
            <header className="flex justify-between p-4">
                <img className="h-8" src={logo} alt="logo" />

                <button
                    type="button"
                    onClick={() => fillModal(null)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
                >
                    <img className="w-4 h-4 mr-2" src={addIcon} alt="add-icon" />
                    Добавить
                </button>
            </header>

            <main className="relative overflow-x-auto flex-1">
                <ContragentTable
                    contragents={contragents}
                    onEdit={fillModal}
                    onDelete={deleteContragent}
                />
            </main>

            <footer className="py-4 text-gray-500 text-center">
                © 2007-2024 ООО "Логнекс"
            </footer>

            {isModalOpen && (
                <ContragentModal
                    contragent={editingContragent}
                    onSave={saveContragent}
                    onCancel={closeModal}
                />
            )}
        </div>
    );
}