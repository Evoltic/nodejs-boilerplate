function requireInServer(module) {
  const pathToServerFolder = __dirname
  return require(pathToServerFolder + module)
}

module.exports = global.requireInServer = requireInServer
