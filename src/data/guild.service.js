const BaseService = require("./base.service");

class GuildService extends BaseService{

    constructor(){
        super('guilds');
    }

    async put(settings, id) {
        if (!id) {

            return this.post(settings);
        }

        return super.put(settings, id)
    }

    async get(id) {

        let response = await super.get(id);
        if (response.message === "Guild not found.") {
            throw new Error("Guild not found.");
        }
        return response;

    }

}
module.exports = GuildService;
