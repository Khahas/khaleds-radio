// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`
  );
  categories = await categories.json();
  res.json(categories);
};

const getProgramEpisodes = async (req, res) => {
  let episodes = await fetch(
    `http://api.sr.se/api/v2/episodes/index?${json}&programid=${req.params.programid}`
  );
  episodes = await episodes.json();
  res.json(episodes);
};

const getCategoriesById = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&programcategoryId=${req.params.categoriesId}`
  );
  categories = await categories.json();
  res.json(categories);
};

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel);
};

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.params.date}`
  );
  channelSchedule = await channelSchedule.json();
  res.json(channelSchedule.schedule);
};

const getChannelProgram = async (req, res) => {
  let channelProgram = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&channelId=${req.params.channelId}`
  );
  channelProgram = await channelProgram.json();
  res.json(channelProgram);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getChannelProgram,
  getAllCategories,
  getCategoriesById,
  getProgramEpisodes,
};
