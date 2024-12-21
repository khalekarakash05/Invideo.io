

defmodule BackendApi.Repo.Migrations.CreateShaderHistories do
  use Ecto.Migration

  def change do
    create table(:shader_histories) do
      add :description, :string
      add :shader_code, :text
      add :created_at, :utc_datetime, default: fragment("NOW()")

      timestamps()
    end
  end
end

#[
#  import_deps: [:ecto_sql],
#  inputs: ["*.exs"]
#]