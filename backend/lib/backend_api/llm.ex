defmodule BackendApi.LLM do
  @moduledoc """
  Module to interact with an LLM (e.g., OpenAI, Grok, or Gemini Flash)
  for generating shader code.
  """

  use Tesla
    IO.inspect(System.get_env("SAMBANOVA_API_KEY"), label: "API Key")

  @api_url "https://api.sambanova.ai/v1/chat/completions" # Sambanova API URL
  # @api_key System.get_env("SAMBANOVA_API_KEY")            Fetch API key from environment variables
  @api_key Application.fetch_env!(:backend_api, BackendApi.LLM)[:sambanova_api_key]

  plug Tesla.Middleware.JSON

  def generate_shader(description) do
    # Ensure API key is available
    if is_nil(@api_key) or @api_key == "" do
      {:error, "Missing SAMBANOVA_API_KEY environment variable"}
    else
      # Construct the proper request body with 'messages' property
      body = %{
        model: "Meta-Llama-3.1-8B-Instruct", # Specify the model
        messages: [
          %{
            role: "system",
            content: "You are a helpful assistant"
          },
          %{
            role: "user",
            content: description
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }

      headers = [{"Authorization", "Bearer #{@api_key}"}]

      case post(@api_url, body, headers: headers) do
        {:ok, %Tesla.Env{status: 200, body: response}} ->
          {:ok, response["choices"] |> hd() |> Map.get("message") |> Map.get("content")}

        {:ok, %Tesla.Env{status: status, body: response}} ->
          {:error, "API returned status #{status}: #{inspect(response)}"}

        {:error, reason} ->
          {:error, "Failed to generate shader: #{inspect(reason)}"}
      end
    end
  end
end
