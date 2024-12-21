import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :backend_api, BackendApi.Repo,
  username: "avnadmin",
  password: "AVNS_SEtnt_by4KhlgipR6RD",
  hostname: "pg-335c37c4-akashkhalekar-8bb7.c.aivencloud.com",
  database: "defaultdb",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :backend_api, BackendApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "tuh0amPrVFanC93agqtxf8Bu6FFumJ6KF3e5w8GonSltkxkxmzPR4/8fO1qJNDnL",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
