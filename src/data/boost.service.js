const BaseService = require("./base.service");

class BoostService extends BaseService{

    constructor(){
        super('boosts');
    }

    async get(id) {

        let response = await super.get(id);
        if (response.message === "Guild not found.") {
            throw new Error("Guild not found.");
        }
        return response;

    }

    async getByPatreonPledgeId(id) {
        try {
            let response = await fetch(this.baseURL + this.target + "/pledge-id/" + id );
            return response.json();
        } catch (e) {
            return {message: "Boost not found."};

        }
    }

    async getGuildBoosts(guildId) {
        try {
            let response = await fetch(this.baseURL + this.target + "/guilds/" + guildId );
            return response.json();
        } catch (e) {
            return {message: "Guild has no boosts."};
        }
    }

}
module.exports = BoostService;
