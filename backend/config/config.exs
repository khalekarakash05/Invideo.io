import Config

# General application configuration
config :backend_api,
  ecto_repos: [],
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :backend_api, BackendApiWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: BackendApiWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: BackendApi.PubSub,
  live_view: [signing_salt: "6Sah0PWC"]

# Configures the LLM module with the API key
config :backend_api, BackendApi.LLM,
  sambanova_api_key: "914dead1-36d9-4eaf-a1c9-367f55f470cb" 

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment-specific config
import_config "#{config_env()}.exs"
