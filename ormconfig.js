module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/*/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  }
}
