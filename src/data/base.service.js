const fetch = require('node-fetch');
const config = require('../../config');

/*
        fetch('http://nginx:80/dropwizard-mongodb-ms/')
            .then(res => res.json())
            .then(json => console.log(json));
 */

class BaseService {
    constructor(target) {
        this.baseURL = config.baseAPI;
        this.target = target;
    }

    async get(id) {
        try {
            let response = await fetch(this.baseURL + this.target + "/" + id );
            return response.json();
        } catch (e) {
            return {message: "Guild not found."};
        }
    }

    async getAll() {
         let response = await fetch(this.baseURL + '/' + this.target );
         return response.json();
    }

    async post(body) {
        let response = await fetch(this.baseURL + '/' + this.target, {
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        return response.json();
    }

    async put(body, id) {
        if (!id) throw new Error("Not able to edit settings. Contact support.");
        let response = await fetch(this.baseURL + '/' + this.target + "/" + id, {
            method: 'PUT',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        return response.text;
    }

    async delete(id) {
        let response = await fetch(this.baseURL + '/' + this.target + "/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return response.text;
    }
}
module.exports = BaseService;
