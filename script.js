$(document).ready( function() {	
	
	////// Interface ///////////////////////////////////////////////////////////////////////////////////////////////////////////	
	toggleKart = function() {
		// Exibe a tela com os itens do carrinho
		$('#kartScreen').toggle();
		loadKart();
	};
	toggleConfig = function() {
		// Exibe a tela de manutenção
		$('#configScreen').toggle();
	};	
	// Adiciona ao carrinho
	$('.addButton').click(function() {
		var gridItem = getGridItem( $(this).closest("div").attr('id') );
		// Adiciona ao shoppingKart[]
		shoppingKart.push(gridItem);	
	});		
	// Remove do carrinho
	$('.removeButton').click(function() {
		var thisId = $(this).closest("tr").attr('id');
		// remove do shoppingKart[]
		shoppingKart.splice(thisId,1);	
	});		
	
	////// Variáveis ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var id = 0;	
	var myGrid = [ 
		// {
			// "id"   : "00001",
			// "name" : "Nome 01",
			// "value": "10.00",
			// "qtd"  : "01",
		// },
		// {
			// "id"   : "00002",
			// "name" : "Nome 02",
			// "value": "20.00",
			// "qtd"  : "02",
		// } 
	];
	var shoppingKart = [];
	
	////// Processamento ///////////////////////////////////////////////////////////////////////////////////////////////////////
	onInit = function(){
		toggleKart();
		toggleConfig();
		loadProducts();
	};
	
	getGridItem = function(itemId){
		return myGrid.find( function(gridItem){
			return gridItem.id === itemId;
		});
	};
	
	getKartItem = function(itemId){		
		return shoppingKart.find( function(kartItem){
			return kartItem.id === itemId;
		});
	};
	
	loadKart = function(){ 
		// Limpa a tabela HTML do carrinho
		$("#kartResult tr").remove(); 
		// Carrega os itens do carrinho no popup
		shoppingKart.forEach(function(kartItem){
			appendKartItem(kartItem);			
		});
	};
		
	appendKartItem = function(kartItem){		
		// Adiciona linha à tabela do carrinho
		var code = "<tr " 
					+"id='" + kartItem.id + "'>" 
					+"<td>" + kartItem.name + "</td>"
					+"<td>" + kartItem.value + "</td>"
					+"<td>" + kartItem.qtd + "</td>"
					+"<td>"
					+"<button class='removeButton'>"
					+"<span class='glyphicon glyphicon-remove-circle'></span>"
					+"</button>"					
					+"</td>"
					+"</tr>";					
		$('#kartResult').append(code);
	};
		
	appendGridDepart = function(gridDepart){
		var code = "<h3 class='sectionTitle' id='" + departId + ">" + departName + "</h3>"
					+ "<section class='row text-center placeholders mySection' style='border-bottom: 1px solid #eee;'>" 
					+ "$$P"
					+ "</section>";
		$('#pageGrid').append(code);
	};
	
	// Preenche o grid
	appendGridItens = function(departTable, prodTable){		
	
		var code = '';
	
		//Cada departamento
		departTable.forEach( function(departLine){	
		
			//Busca produtos daquele departamento
			var prodsOfDepart = prodTable.filter(function(prodLine){
				return prodLine.departId === departLine.id;
			});
			
			//Se possuir produtos para esse departamento
			if (prodsOfDepart.length != 0){					
								
				var departProds = '';

				//Para cada produto desse departamento
				prodsOfDepart.forEach( function(prodLine){
					// Monta codigo do grid
					var newProd = "<div class='col-6 col-sm-3 placeholder myProduct'>"
								+ "<a target='_blank' href='" + prodLine.img + "'>"
								+ "<img 'src='" + prodLine.img 
								+ "' width='200' height='200' class='img-fluid' alt='Generic placeholder thumbnail>" + "</a>"
								+ "<table class='table' id='"
								+ prodLine.id
								+ "'>" + "<tbody>"
								+ "<tr>" + "<h4 class='prodName'>"
								+ prodLine.name
								+ "</h4>" + "</tr>"
								+ "<tr>" + "<p class='prodSize'>"
								+ prodLine.size
								+ "</p>" + "</tr>"
								+ "<tr>" + "<p class='prodValue'>"
								+ prodLine.value
								+ "</p>" + "</tr>" + "<tr>" 
								+ "<button class='addButton'>" 
								+ "<span class='glyphicon glyphicon-plus'></span>" + "<b>Comprar</b>" 
								+ "</button>" + "</tr>" + "</tbody>" + "</table>" + "</div>";
								
					departProds += newProd;
				});
				
				var newDepart 	= "<h3 class='sectionTitle' id='" + departLine.id + ">" + departLine.name + "</h3>"
								+ "<section class='row text-center placeholders mySection'>"
								+ departProds 
								+ "</section>";
			};
			
			code += newDepart;
			
		});
		
		// Adiciona codigo ao HTML
		$('#pageGrid').append(code);
		
	};
	
	
	addToKart = function(itemId){		
		//Adiciona ao carrinho
		shoppingKart.push( getGridItem(itemId) );
	};
	
	// Limpa o carrinho
	clearKart = function(id){
		// Remove do shoppingKart[]
		shoppingKart.splice(0,shoppingKart.length);	
		// Limpa a tabela HTML do carrinho
		$("#kartResult tr").remove(); 
	};
	
	////// Configuração ////////////////////////////////////////////////////////////////////////////////////////////////////////			
	submitForm = function(){
		// recupera do FORM e insere no firebase
	};
	loadProducts = function(){
		//Limpa a HTML
		// $('#pageGrid h3').remove();
		// $('#pageGrid section').remove();
		
		//Busca departamentos
		myDeparts = getDepartTable();
		//Busca produtos
		myGrid    = getProdTable();
		
		myGrid = {
			"id"   : "00001",
			"name" : "Nome 01",
			"value": "10.00",
			"qtd"  : "01",
		},
		{
			"id"   : "00002",
			"name" : "Nome 02",
			"value": "20.00",
			"qtd"  : "02",
		};
		
		
		//Insere dados em tela
		appendGridItens(myDeparts, myGrid);
	};
	deleteProduct = function(){
		// remove produto do firebase
	};
	
	////// Firebase ////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  // Initialize Firebase
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
	
	////// Inicializando ///////////////////////////////////////////////////////////////////////////////////////////////////////	
	onInit();
	
	
});