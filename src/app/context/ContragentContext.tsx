import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";

import { Contragent } from "../entities/contragent";

type ContragentData = Omit<Contragent, "id">;

type ContragentContextType = {
    contragents: Contragent[];

    addContragent: (data: ContragentData) => Promise<void>;
    updateContragent: (id: number, data: ContragentData) => Promise<void>;
    deleteContragent: (id: number) => Promise<void>;
};

const ContragentContext = createContext<ContragentContextType | null>(null);

type Props = {
    children: ReactNode;
};

const API_URL = "http://localhost:3001/contragents";

export function ContragentProvider({ children }: Props) {
    const [contragents, setContragents] = useState<Contragent[]>([]);

    useEffect(() => {
        getContragents();
    }, []);

    async function getContragents() {
        const response = await fetch(API_URL);
        const data: Contragent[] = await response.json();

        setContragents(data);
    }

    async function addContragent(data: ContragentData) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const newContragent: Contragent = await response.json();

        setContragents([
            ...contragents,
            newContragent
        ]);
    }

    async function updateContragent(id: number, data: ContragentData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                ...data
            })
        });

        const updatedContragent: Contragent = await response.json();

        setContragents(
            contragents.map((contragent) =>
                contragent.id === id
                    ? updatedContragent
                    : contragent
            )
        );
    }

    async function deleteContragent(id: number) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        setContragents(
            contragents.filter((contragent) => contragent.id !== id)
        );
    }

    return (
        <ContragentContext.Provider
            value={{
                contragents,
                addContragent,
                updateContragent,
                deleteContragent
            }}
        >
            {children}
        </ContragentContext.Provider>
    );
}

export function useContragents() {
    const context = useContext(ContragentContext);

    if (!context) {
        throw new Error();
    }

    return context;
}