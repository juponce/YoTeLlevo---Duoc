export interface UserTable {
    uid: string;
    name: string;
    lastName: string;
    eMail: string;
    password: string;
    tel: number;
    type: 'pasajero' | 'conductor';
}

export interface PostTable {
    uid: string;
    title: string;
    content: string;
    published: string;
    author: string;
}

export interface PostRuta {
    uid: string;
    inicio: string;
    final: string;
    asientos: number;
    precio: number;
    autor: string;
    publicado: string;
}

export interface ViajesPasajero {
    uid: string;
    pasajeroUid: string;
    inicio: string;
    final: string;
    precio: number;
    conductor: string;
    fecha: string;
}