$(document).ready( function() {	
	
	////// Interface ///////////////////////////////////////////////////////////////////////////////////////////////////////////	
	toggleKart = function() {
		if($('#kartScreen').is(":visible") === true ){
			loadKart();
		} else {
			clearKart();
		};
		// Exibe a tela com os itens do carrinho
		$('#kartScreen').toggle();
	};
	toggleConfig = function() {
		// Exibe a tela de manutenção
		$('#configScreen').toggle();
	};
	
	////// Variáveis ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var id = 0;	
	var myGrid = [ 
		{
			"id   ": "00001",
			"name ": "Nome 01",
			"value": "10.00",
			"qtd  ": "01",
		},
		{
			"id   ": "00002",
			"name ": "Nome 02",
			"value": "20.00",
			"qtd  ": "02",
		} 
	];
	var shoppingKart = myGrid;
	
	////// Processamento ///////////////////////////////////////////////////////////////////////////////////////////////////////
	loadKart = function(){
		// Carrega os itens do carrinho no popup
		shoppingKart.map( function(item){
			appendKartItem(item);
		});
	};
		
	appendKartItem = function(item){		
		var myId = item.id;
		var myName = item.name;
		var myValue = item.value;
		var myQdt = item.qdt;
	
		// Adiciona linha à tabela do carrinho
		var code = "<tr id='"
					+myId
					+"'>" 
					+"<td>"
					+myName
					+"</td>"
					+"<td>"
					+myValue
					+"</td>"
					+"<td>"
					+myQdt
					+"</td>"
					+"<td>"
					+"<button class='removeButton'>"
					+"<span class='glyphicon glyphicon-remove-circle'></span>"
					+"</button>"					
					+"</td>"
					+"</tr>";					
		$('#kartResult').append(code);
	};
	
	
	//Adiciona ao carrinho
	addToKart = function(id){		
		// recupera do myGrid[] 
		var result = myGrid.filter( function(obj){ return obj.id === id; });
		if (result === undefined) {
			//insere no shoppingKart[]
			shoppingKart.push(result[0])			
		};
	};
	
	// Remove do carrinho
	$('.removeButton').click(function() {
		var thisId = $(this).closest("tr").attr('id');
		// remove do shoppingKart[]
		shoppingKart.splice(thisId,1);		
		// atualiza tela
		loadKart();
	});		
	
	// Limpa o carrinho
	clearKart = function(id){
		// remove do shoppingKart[]
		shoppingKart.splice(0,shoppingKart.length);
		// atualiza tela
		loadKart();
	};
	
	////// Configuração ////////////////////////////////////////////////////////////////////////////////////////////////////////			
	submitForm = function(){
		// recupera do FORM e insere no firebase
	};
	loadProducts = function(){
		// recupera do firebase e insere no array myGrid
	};
	deleteProduct = function(){
		// remove produto do firebase
	};
	
	
	////// Inicializando ///////////////////////////////////////////////////////////////////////////////////////////////////////	
	toggleKart();
	toggleConfig();
	
	
	
});