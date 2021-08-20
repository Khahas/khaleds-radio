const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

router.get("", channelController.getAllChannels);
router.get("/:channelId", channelController.getChannelById);
router.get("/schedule/:channelId/:date", channelController.getChannelSchedule);
router.get("/program/:channelId", channelController.getChannelProgram);


router.get("/categories", channelController.getAllCategories);
router.get("/categories/:categoriesId", channelController.getCategoriesById);
router.get("/episodes/:episodes", channelController.getProgramEpisodes);

module.exports = router;
