import express from "express";

interface Client {
    id: string;
    res: express.Response;
}

let clients: Client[] = [];

const broadcast = (data: any) => {
    const stringifiedData = JSON.stringify(data);
    clients.forEach((client) => {
        client.res.write(`data: ${stringifiedData}\n\n`);
    });
};

const connect = (id: string, res: express.Response) => {    
    const client: Client = {
        id,
        res,
    };
    clients.push(client);
};

const disconnect = (clientId: string) => {
    clients = clients.filter((client: Client) => client.id !== clientId);
};

export default {
    broadcast,
    connect,
    disconnect,
};
