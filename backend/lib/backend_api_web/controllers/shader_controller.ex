defmodule BackendApiWeb.ShaderController do
  use BackendApiWeb, :controller

  alias BackendApi.LLM

  def generate(conn, %{"description" => description}) do
    # Call the LLM to generate shader code
    case LLM.generate_shader(description) do
      {:ok, shader_code} ->
        # Validate the shader code (e.g., check GLSL syntax)
        if is_valid_shader(shader_code) do
          json(conn, %{shader_code: shader_code})
        else
          json(conn, %{
            error: "Generated shader code is invalid.",
            shader_code: shader_code
          })
        end

      {:error, reason} ->
        json(conn, %{error: reason})
    end
  end

  # Placeholder for shader validation logic
  defp is_valid_shader(shader_code) do
    shader_code != ""
  end
end
