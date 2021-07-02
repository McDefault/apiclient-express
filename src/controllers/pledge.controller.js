const GuildService = require('../data/guild.service');
const BoostService = require('../data/boost.service');
const Boost = require('../models/Boost');

class PledgeController {

    constructor() {
        this.guildService = new GuildService();
        this.boostService = new BoostService();
    }

    async saveBoost(boostModel) {

        try {
            const newBoost = await this.boostService.post(boostModel);

            if (!newBoost.errors) {
                return newBoost;

            } else {
                return newBoost.errors;
            }
        } catch (e) {
            return null;
        }
    }

    async updateBoost(oldModel, newModel) {
        newModel.created_at = oldModel.created_at;
        newModel.updated_at = new Date().getTime();
        newModel.guilds = oldModel.guilds;

        try {
            const updatedBoost = await this.boostService.put(newModel, oldModel.id);

            if (!updatedBoost.errors) {
                return updatedBoost;

            } else {
                return updatedBoost.errors;
            }
        } catch (e) {
            return null;
        }
    }

    getBoostModelFromRequest(req) {

        const patreon_pledge_id = req.body.data.id;
        const booster_snowflake = this.getBoostSnowflakeFromReq (req);

        //get pledge discord user id
        if (!booster_snowflake) {
            console.log(`Error: No booster_snowflake found in request ${patreon_pledge_id}`);
            return null;

        }
        const guild_snowflake = null;

        // todo fix count
        const count = this.getBoostCountFromRequest(req);

        const created_at = new Date().getTime();
        const expires_at = this.getExpiredDateFromReq(req);

        return new Boost(null, booster_snowflake, patreon_pledge_id, [], count, created_at, null, expires_at);
    }

    getBoostSnowflakeFromReq (req) {
        let booster_snowflake = null;

        for (let include of req.body.included) {
            if (include.type === "user") {
                booster_snowflake = include.attributes.social_connections.discord.user_id;
                break;
            }
        }
        return booster_snowflake;

    }

    getBoostCountFromRequest(req) {
        switch(req.body.data.attributes.pledge_amount_cents) {
            case 500:
                return 1;

            case 900:
                return 1;

            case 1350:
                return 3;

            case 1700:
                return 4;

            case 7000:
                return 20;

            case 14000:
                return 40;

            default:
                return 0;
        }
        // return Math.round((req.body.data.attributes.pledge_amount_cents / 500));
    }

    getExpiredDateFromReq(req) {
        let expires_at = new Date(req.body.data.attributes.last_charge_date);
        expires_at.setMonth(expires_at.getMonth() + 1);
        expires_at = expires_at.getTime();
        return expires_at;
    }

    async getOldModel(boostModel) {
        try {
            const model = await this.boostService.getByPatreonPledgeId(boostModel.patreon_pledge_id);

            if (model.errors) {
                return model.errors;
            } else {
                return model;
            }
        } catch (e) {
            return null;
        }
    }

    async calculateGuildBoosts(guild_snowflake) {
        let totalBoostCount = 0;

        //get all guild boosts
        let guildBoosts = await this.boostService.getGuildBoosts(guild_snowflake);

        if (guildBoosts.message !== 'Guild has no boosts.') {
            for (let boost of guildBoosts) {
                boost = new Boost(boost.id, boost.booster_snowflake, boost.patreon_pledge_id, boost.guilds, boost.count, boost.created_at, boost.updated_at, boost.expires_at);

                if (!boost.isExpired()) {
                    totalBoostCount = totalBoostCount + boost.count;
                } else {

                }
            }
}
        return totalBoostCount;
    }

    async updateGuildBoosts(guild_snowflake, totalBoostCount) {
        let settings;
        try {
            settings = await this.guildService.get(guild_snowflake);

        } catch (e) {
            settings = {
                "snowflake": guild_snowflake,
                "premium": totalBoostCount,
                "guildName": "name",
                "prunelock": false
            };
        }

        return this.guildService.put(settings, settings.id);

    }
}
module.exports = PledgeController;