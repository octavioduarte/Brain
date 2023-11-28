Executando o projeto: 

1º Primeiramente instale as dependêncis com: 

~~~bash
 npm i
~~~

2º Adicione o arquivo .env, com a variável `DATABASE_URL`.


3º Para startar a API rode o comando: 

~~~bash
 npm run dev
~~~


Abaixo estão alguns curls que você pode executar, ou se preferir copiar e colar o conteúdo do arquivo `Insomnia_2023-11-28.json` no [Insomnia](https://insomnia.rest/download).

# Para cadastrar um novo produtor
~~~curl
curl --request POST \
  --url http://localhost:3000/brain/producer \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.4.5' \
  --data '{
	"name": "Usuário 2",
	"document": "09292678000",
	"document_type": "CPF",
	"farm": [
			{
			"name": "Fazenda Paraiba",
			"zip_code": "64027660",
			"area": 2500,
			"arable_area": 1000,
			"vegetation_area": 500,
			"cultures": [
				{
					"id": 10,
					"occupation_area": 500
				}
			]
		}
	]
}'
~~~


# Para ativar ou inativar um produtor (exclusão lógica)

~~~curl
curl --request PATCH \
  --url http://localhost:3000/brain/producer \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.4.5' \
  --data '{
	"document": "09292678000",
	"document_type": "CPF",
	"new_status": false
}'
~~~


# Para carregar as métricas

~~~curl 
curl --request GET \
  --url http://localhost:3000/brain/metrics \
  --header 'User-Agent: insomnia/8.4.5'
~~~


<hr/>

Rotas da aplicação: 

Método: `POST` <br/>
Descrição: *Regitrar novos produtores rurais com suas fazendas.*

Cenários de validação: 

- Verifica se o CPF ou CNPJ é válido (campo 'document').
- Verifica se o CPF ou CNPJ já está cadastrado na base.
- Verifica se o tipo de documento é válido (campo 'document_type') - Aceita CPF e CNPJ.
- Valida cada campo da request para garantir que as tipagens e os atributos estão corretos.
- Faz integração com a API da viacep para obter cidade e estado a partir do CEP.
- Cálculo das áreas da fazenda x cultura: 
	- Garante que a soma da área das culturas plantadas não supere a área da fazenda.
	- Garante que a soma da área das culturas plantadas não supere a área agricultável.
	- Garante que a soma da área agricutável com a área de vegetação não supera a área da fazenda.
<hr/>

Método: `PATCH` <br/>
Descrição: *Altera o status de ativo do usuário.*


Cenários de validação: 

- Verifica se o CPF ou CNPJ é válido (campo 'document').
- Verifica se o CPF ou CNPJ existe na base.
- Verifica se o tipo de documento é válido (campo 'document_type') - Aceita CPF e CNPJ.
- Valida cada campo da request para garantir que as tipagens e os atributos estão corretos.
	
	
<h4>Obs: Uma vez que o status esteja inativado o usuário passa a não ser considerado nos demais fluxos da API.</h4>

<hr/>

Método: `GET` <br/>
Descrição: *Carrega métricas dos dados cadastrados.*

~~~json
{
	"farms_total" // total de fazendas cadastradas
	"farms_total_area_in_hct" // soma da área das fazendas cadastradas
	"farms_total_arable_area_in_hct" // soma da área agricutável das fazendas cadastradas
	"farms_total_vegetation_area_in_hct" // soma da área de vegetação das fazendas cadastradas
	"farms_total_by_state": {
		"sp" // <-- sigla UF: {
			"farms_total" // soma das fazendas vinculadas a um estado
			"farms_total_area_in_hct" // soma da área das fazendas cadastradas do estado
		}
	},
	"total_by_culture": {
		"soja": {
			"total_occupation_in_hct": // soma da área de ocupação da cultura
		}
	}
}
~~~