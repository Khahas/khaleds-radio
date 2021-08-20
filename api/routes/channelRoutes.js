const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

router.get("", channelController.getAllChannels);
router.get("/categories", channelController.getAllCategories);
router.get("/categories/:categoriesId", channelController.getCategoriesById);
router.get("/:channelId", channelController.getChannelById);
router.get("/schedule/:channelId/:date", channelController.getChannelSchedule);
router.get("/program/:channelId", channelController.getChannelProgram);
router.get("/episodes/:programid", channelController.getProgramEpisodes);

module.exports = router;
