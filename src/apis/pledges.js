const express = require('express');
let router = express.Router();
const parkService = require('../data/park-service');
const PledgeController = require('../controllers/pledge.controller');

router
    .get('/', (req, res) => {
        parkService.get().then(parks => {
            res.json(parks);
        });
        // process.exit(1);

    })
    .post('/', async (req, res) => {
        console.log(req.body.data.attributes.last_charge_status);
        if (req.body.data.attributes.last_charge_status !== "Paid") {
            //todo guild premium calculation
            console.log(`Status not paid, stopping`);
            res.status(201);
            res.end();
            return;
        }
        const pledgeController = new PledgeController();

        let boostModel = pledgeController.getBoostModelFromRequest(req);
        console.log(boostModel);
        if(boostModel.count <= 0) {
            console.log(`Count zero, stopping`);

            res.status(201);
            res.end();
            return;
        }
m
        const oldModel = await pledgeController.getOldModel(boostModel);

        //check if boost already exists
        if(!oldModel.message) {
            //update existing boost with new dates
            boostModel = await pledgeController.updateBoost(oldModel, boostModel);
            console.log(oldModel);
        } else {
            //save boost
            boostModel = await pledgeController.saveBoost(boostModel);

        }

        // if (boostModel.error) {
        //
        // }

        // console.log(req.headers);
        parkService.save(req.body).then(() => {
            res.status(201);
            res.end();
        });

    });

module.exports = router;