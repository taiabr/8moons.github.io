$(document).ready( function() {	
	
	////// Variáveis ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var id = 0;	
	var myDeparts = [];
	var myGrid = [];
	var shoppingKart = [];
	
	////// Processamento ///////////////////////////////////////////////////////////////////////////////////////////////////////
	// Inicializa a pagina
	onInit = function(){
		toggleKart();
		toggleConfig();
		loadProducts();
	};		
	// Sai da pagina
	onExit = function(){
		// Salva modificações no BD
	};			
	// Exibe/Esconde tela do carrinho
	toggleKart = function() {
		// Exibe a tela com os itens do carrinho
		$('#kartScreen').toggle();
		loadKart();
	};
	// Exibe/Esconde tela de manutenção
	toggleConfig = function() {
		// Exibe a tela de manutenção
		$('#configScreen').toggle();
	};	
	// Recupera item do Grid
	getGridItem = function(itemId){
		return myGrid.find( function(gridItem){
			return gridItem.id === itemId;
		});		
	};
	// Recupera item do carrinho
	getKartItem = function(itemId){		
		return shoppingKart.find( function(kartItem){
			return kartItem.id === itemId;
		});
	};
	// Carrega informação do carrinho
	loadKart = function(){ 
		// Limpa a tabela HTML do carrinho
		$("#kartResult tr").remove(); 
		// Carrega os itens do carrinho no popup
		for (var i = 0; i < shoppingKart.length; i++){
			appendKartItem(shoppingKart[i]);			
		};
	};
	// Insere HTML de item do carrinho
	appendKartItem = function(kartItem){		
		// Monta ID para o botao
		var btnId = 'remove-' + String(kartItem.id);
		
		// Adiciona linha à tabela do carrinho
		var code 
				= "<tr " + "id='" + kartItem.id + "'>" 
					+ "<td>" + kartItem.name + "</td>"
					+ "<td>" + 'R$ ' + kartItem.value + "</td>"
					+ "<td>" + kartItem.qtd + "</td>"
					+ "<td>"
						+ "<button class='removeButton' id='" + btnId + "'>"
							+ "<span class='glyphicon glyphicon-remove-circle'></span>"
						+ "</button>"					
					+ "</td>"
				+ "</tr>";					
		$('#kartResult').append(code);	
		
		// Seta ação do botao
		btnId = '#' + btnId;
		$( btnId ).click(function() {
			var thisId = $(this).closest("tr").attr('id');
			// remove do shoppingKart[]
			removeFromKart(thisId);
			loadKart();
		});	
	};
	// Insere HTML dos departamentos no grid
	appendGridDepart = function(gridDepart){
		var code = "<h3 class='sectionTitle' id='" + dept + ">" + departName + "</h3>"
					+ "<section class='row text-center placeholders mySection' style='border-bottom: 1px solid #eee;'>" 
					+ "$$P"
					+ "</section>";
		$('#pageGrid').append(code);
	};
	// Insere HTML dos produtos no grid
	appendGridItens = function(departTable, prodTable){		
	
		var code = '';
	
		//Cada departamento
		// for (var i = 0; i < departTable.length; i++){
		departTable.forEach( function(departLine){	
		
			//Busca produtos daquele departamento
			var prodsOfDepart = prodTable.filter(function(prodLine){
				return prodLine.dept === departLine.id;
			});
			
			//Se possuir produtos para esse departamento
			if (prodsOfDepart.length != 0){					
								
				var departProds = '';

				//Para cada produto desse departamento
				// for (var j = 0; j < prodsOfDepart.length; j++){
				prodsOfDepart.forEach( function(prodLine){
					
					// Monta ID para o botao
					var btnId = '#add-' + String(prodLine.id);
					
					// Monta codigo do grid
					var newProd 
						= "<div class='col-6 col-sm-3 placeholder myProduct' id='" + prodLine.id + "'>"
							+ "<a target='_blank' href='" + prodLine.img + "'>"
								+ "<img src='" + prodLine.img + "' width='200' height='200' class='img-fluid' alt='Generic placeholder thumbnail'>" 
							+ "</a>"
							+ "<table class='table'>" 
								+ "<tbody>"
									+ "<tr>" 
										+ "<h4 class='prodName'>" + prodLine.name + "</h4>" 
									+ "</tr>"
									+ "<tr>" 
										+ "<p class='prodSize'>" + prodLine.size + "</p>" 
									+ "</tr>"
									+ "<tr>" 
										+ "<p class='prodValue'>" + 'R$ ' + prodLine.value + "</p>" 
									+ "</tr>" 
									+ "<tr>" 
										+ "<button class='addButton' id='" + btnId + "'>" 
											+ "<span class='glyphicon glyphicon-plus'></span>" 
											+ "<b>Comprar</b>" 
										+ "</button>" 
									+ "</tr>" 
								+ "</tbody>" 
							+ "</table>" 
						+ "</div>";
								
					departProds += newProd;
				});
				
				var newDepart 	
						= "<h3 class='sectionTitle' id='" + departLine.name + "'>" + departLine.name + "</h3>"
						+ "<section class='row text-center placeholders mySection'>"
							+ departProds 
						+ "</section>";
			};
			
			code += newDepart;
			
		});
		
		// Adiciona codigo ao HTML
		$('#pageGrid').append(code);
					
		// Seta ação DE ADIÇÃO do botao
		$('.addButton').click(function() {			
			var itemId = $(this).closest("div").attr('id');
			// Adiciona ao shoppingKart[]
			addToKart(itemId, 1);	
		});			
		
		
	};
	// Remove do carrinho
	removeFromKart = function(thisId){
		var thisItem = getKartItem(thisId);
		var itemIndex = shoppingKart.indexOf(thisItem);	
		
		if (thisItem.qtd > 1){
			shoppingKart[itemIndex].qtd -= 1;
		} else {				
			shoppingKart.splice( itemIndex, 1);	
		};
	};
	//Adiciona ao carrinho
	addToKart = function(itemId, addQtd){		
		var newItem = getGridItem(itemId);
		var kartItem = getKartItem(itemId);	
		
		// Ainda nao esta no carrinho
		if ( kartItem === undefined ){
			//Adiciona ao carrinho
			newItem.qtd = addQtd;
			shoppingKart.push( newItem );	
			
		} else {	
			
			if ( newItem.qtd < (kartItem.qtd + addQtd) ){
				alert('Sem quantidade suficiente!');		
			
			// Atualiza a quantidade requisitada
			} else {
				//Atualiza a qtd do item no carrinho
				var itemIndex = shoppingKart.indexOf(kartItem);
				shoppingKart[itemIndex].qtd += addQtd;
			};
			
		};
	};
	// Limpa o carrinho
	clearKart = function(id){
		// Remove do shoppingKart[]
		shoppingKart.splice(0,shoppingKart.length);	
		// Limpa a tabela HTML do carrinho
		$("#kartResult tr").remove(); 
	};		
	// Carrega o grid
	loadProducts = function(){		
		//Limpa a HTML
		$('#pageGrid h3').remove();
		$('#pageGrid section').remove();
		
		//Busca departamentos
		myDeparts = getDepartTable();
		//Busca produtos
		myGrid    = getProdTable();
		
//////////////////////////////// TESTE - INICIO ////////////////////////////////
		myGrid = [{
			"id"   : "00001",
			"name" : "Blusa de tricô",
			"value": "30.00",
			"size" : "Tamanho único",
			"qtd"  : "1",
			"img"  : "images/bluda-trico.jpg",
			"dept" : "00001",
		},
		{
			"id"   : "00002",
			"name" : "Saia Longa com Cinto",
			"value": "25.00",
			"size" : "Tamanho M",
			"qtd"  : "1",
			"img"  : "images/saia-longa.jpg",
			"dept" : "00002",
		},
		{
			"id"   : "00003",
			"name" : "Vestido de Moleton 3 em 1",
			"value": "60.00",
			"size" : "Tamanho M",
			"qtd"  : "1",
			"img"  : "images/vestido-moleton.jpg",
			"dept" : "00003",
		}];		
		myDeparts = [{
			"id"   : "00001",
			"name" : "Blusas",
		},
		{
			"id"   : "00002",
			"name" : "Saias",
		},
		{
			"id"   : "00003",
			"name" : "Vestidos",
		}];
//////////////////////////////// TESTE - FIM ///////////////////////////////////		
		
		
		//Insere dados em tela
		appendGridItens(myDeparts, myGrid);
	};
	////// Firebase ////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	// var config = {
		// apiKey: "AIzaSyAwm_buVA5z6szyeI1JjD_6zupg3vtIbJI",
		// authDomain: "moons-bazaar.firebaseapp.com",
		// databaseURL: "https://moons-bazaar.firebaseio.com",
		// projectId: "moons-bazaar",
		// storageBucket: "moons-bazaar.appspot.com",
		// messagingSenderId: "281206407475"
	// };
	// firebase.initializeApp(config);

	// Recupera a referência ao BD
	// var myDatabase = firebase.database();
	
	// Envia formulário de manutenção
	submitForm = function(){
		// recupera do FORM e insere no firebase
	};
	// Recupera produtos cadastrados na base
	getProdTable = function(){
		
	};
	// Recupera departamentos cadastrados na base	
	getDepartTable = function() {
		
	};
	// Remove produto do BD
	deleteProduct = function(){
		// remove produto do firebase
	};
	
	////// Inicializando ///////////////////////////////////////////////////////////////////////////////////////////////////////	
	onInit();
	
	
});