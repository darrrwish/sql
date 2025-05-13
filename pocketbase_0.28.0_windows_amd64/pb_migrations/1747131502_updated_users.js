/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_1736455494` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_1736455494` ON `users` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_ZhsEpc8649` ON `users` (`username`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_1736455494` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_1736455494` ON `users` (`email`) WHERE `email` != ''"
    ]
  }, collection)

  return app.save(collection)
})
