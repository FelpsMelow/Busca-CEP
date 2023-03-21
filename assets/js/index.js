function cep() {

    var numero_cep = document.getElementById("txt-cep").value;
    req_api_cep(numero_cep);

    function req_api_cep(cep) {
        
        if (cep.length !== 8) { //Validando a entrada do usuário pela quantidade de caracteres
            alert('CEP inválido');
            return;
        }

        let url = 'https://viacep.com.br/ws/' + cep + '/json'; //Concatenando texto de uma maneira mais facil
            

        fetch(url).then(function(res) {//Bloco da requisição

            res.json().then(function(data) {

                let cep_status = ''

                if (data.erro) {    //Validando resposta da API
                    cep_status = 'erro'
                    document.getElementById('txt-cep').value = ''
                    alert('CEP não encontrado')

                }
                
                let tipo_logradouro = data.logradouro;
                console.log(data)
                var list_tipo_logradouro = ''

                for(iten in tipo_logradouro) {
                    if(tipo_logradouro[iten] !== " ") {
                      list_tipo_logradouro = (list_tipo_logradouro + tipo_logradouro[iten]);
                    }
                    else {
                        break
                    }
                }

                console.log(cep_status);

                if (cep_status !== 'erro') {
                    show_results(data, list_tipo_logradouro); // Chamar função para mostrar o resulado ao usuário "Meu json está aqui"
                }

            })
            
        }); //Minha requisição morreaqui --------             
        
    }

    function show_results(data_json, tipo_logradouro) {

        let obj_card_cep = document.getElementById('card-cep');
        let obj_screen_validation = document.getElementById('screen-validation');
        obj_card_cep.style.display = 'none';
        obj_screen_validation.style.display = 'flex';

        let obj_h1_paracomecar = document.getElementById('left-container-h1-01');
        let obj_h1_agr_valide = document.getElementById('left-container-h1-02');
        obj_h1_paracomecar.style.display = 'none';
        obj_h1_agr_valide.style.display = 'flex';

        document.getElementById('tipo-logradouro').value        = (tipo_logradouro);
        document.getElementById('logradouro').value             = (data_json.logradouro);
        document.getElementById('complemento-residencia').value = (data_json.complemento);
        document.getElementById('bairro').value                 = (data_json.bairro);
        document.getElementById('municipio').value              = (data_json.localidade);
        document.getElementById('uf').value                     = (data_json.uf);
        document.getElementById('pais').value                   = 'Brasil';
        document.getElementById('cep').value                    = (data_json.cep);
    }

}