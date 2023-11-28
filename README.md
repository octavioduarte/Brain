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