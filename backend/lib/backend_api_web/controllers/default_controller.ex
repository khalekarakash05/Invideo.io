defmodule BackendApiWeb.DefaultController do
  use BackendApiWeb, :controller

  def index(conn, _params) do
    text conn, "The real deal api is live - #{Mix.env()}"
    json(conn, %{message: "Welcome to the Backend API "})
    
  end
end
