export class Contragent {
    id: number;
    name: string;
    inn: string;
    address: string;
    kpp: string;

    constructor(id: number, name: string, inn: string, address: string, kpp: string) {
        this.id = id;
        this.name = name;
        this.inn = inn;
        this.address = address;
        this.kpp = kpp;
    }
}