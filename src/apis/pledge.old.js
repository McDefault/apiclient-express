const express = require('express');
const GuildService = require('../data/guild.service');
const BoostService = require('../data/boost.service');
const PledgeController = require('../controllers/pledge.controller');
const parkService = require('../data/park-service');

let router = express.Router();


// private String booster_snowflake;
// private String patreon_pledge_id;
// private String guild_snowflake;
// private Integer count;
// private Long created_at;
// private Long updated_at;
// private Long expires_at;

router
    .get('/', (req, res) => {
        parkService.get().then(parks => {
            res.json(parks);
        });
    })
    .post('/', async (req, res) => {



    });

module.exports = router;