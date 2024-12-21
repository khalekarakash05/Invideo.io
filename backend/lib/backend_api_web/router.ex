defmodule BackendApiWeb.Router do
  use BackendApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BackendApiWeb do
    pipe_through :api
    get "/", DefaultController, :index
    post "/shader/generate", ShaderController, :generate
    
  end
end
