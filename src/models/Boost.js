class Boost {

    booster_snowflake;
    patreon_pledge_id;
    guild_snowflake;
    count;
    created_at;
    updated_at;
    expires_at;

    constructor(id = null, booster_snowflake, patreon_pledge_id, guilds, count, created_at, updated_at = null, expires_at = null) {
        this.id = id;
        this.booster_snowflake = booster_snowflake;
        this.patreon_pledge_id = patreon_pledge_id;
        this.guilds = [];
        this.count = count;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.expires_at = expires_at;
    }

    isExpired() {
        return (new Date().getTime() > new Date(this.expires_at).getTime())
    }
    //return promise bool
    hasVoted(id) {
        return this.api.hasVoted(id);
    }

    // <UserId , cacheEntry>
    static async init(token) {
        this.api = new Topgg.Api(token);
    }
}
module.exports = Boost;