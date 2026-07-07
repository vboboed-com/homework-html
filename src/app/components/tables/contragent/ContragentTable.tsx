import { Contragent } from "../../../entities/contragent";

type Props = {
    contragents: Contragent[];
    onEdit: (contragent: Contragent) => void;
    onDelete: (id: number) => void;
};

export function ContragentTable({ contragents, onEdit, onDelete }: Props) {
    return (
        <table id="contragents-table" className="w-full text-left rtl:text-right">
            <thead className="uppercase font-bold text-xs bg-gray-50 text-gray-700">
            <tr>
                <th scope="col" className="px-6 py-3">Наименование</th>
                <th scope="col" className="px-6 py-3">ИНН</th>
                <th scope="col" className="px-6 py-3">Адрес</th>
                <th scope="col" className="px-6 py-3">КПП</th>
                <th scope="col" className="px-6 py-3">Действия</th>
            </tr>
            </thead>

            <tbody>
            {contragents.map((contragent) => (
                <tr
                    key={contragent.id}
                    className="border-b text-sm cursor-pointer"
                    onDoubleClick={() => onEdit(contragent)}
                >
                    <td className="px-6 py-4 text-gray-500">{contragent.name}</td>
                    <td className="px-6 py-4 text-gray-500">{contragent.inn}</td>
                    <td className="px-6 py-4 text-gray-500">{contragent.address}</td>
                    <td className="px-6 py-4 text-gray-500">{contragent.kpp}</td>
                    <td className="px-6 py-4">
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm px-3 py-1"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDelete(contragent.id);
                            }}
                        >
                            Удалить
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}