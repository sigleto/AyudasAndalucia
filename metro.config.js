const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
// Build caches change rapidly on Windows; they are not application sources.
const previous = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(previous) ? previous : previous ? [previous] : []),
  /[/\\]\.validation[/\\].*/,
  /[/\\]\.npm-cache[/\\].*/,
  /[/\\]legacy[/\\].*/,
  /[/\\]\.cxx[/\\].*/,
  /[/\\]android[/\\](?:build|\.gradle)[/\\].*/,
  /[/\\]android[/\\]app[/\\]build[/\\].*/,
];
module.exports = config;
