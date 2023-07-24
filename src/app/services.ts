import API from './utils/api';

export async function sendMessage(payload: any): Promise<unknown> {
    let url = 'http://localhost:8989/lex/interact';
    return API.post(url, payload).then((result) => result.data);
}


