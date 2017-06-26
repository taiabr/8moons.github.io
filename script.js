$(document).ready(function() {	
	
	////// Variáveis / Classes /////////////////////////////////////////////////////////////////////////////////////////////////	
	var id = 0;
	var shoppingKart = [];
	
	class myProduct{
		constructor(id, name, value, qtd){
			this.id    = id;
			this.name  = name;
			this.value = value;
			this.qtd   = qtd;
		};
	};

	////// Métodos de Interface ////////////////////////////////////////////////////////////////////////////////////////////////	
	showKart = function() {
		// Exibe a tela com os itens do carrinho
		$('#kartScreen').toggle();
	};
	
	////// Métodos de Processamento ////////////////////////////////////////////////////////////////////////////////////////////	
    onAction = function(action) {
        switch (action) {
            case 'add':
				addProduct();
                break;
            case 'remove':
                removeProduct(id);
                break;
            case 'clear':
                clearKart();
                break;
            case 'checkOut':
                checkOut();
                break;
            default:
                break;
        };
    };
		
	addProduct = function(name, value, qtd) {
		if(qtd > 0){
			var newProduct = new myProduct(id, name, value, qtd);
			shoppingKart.push(newProduct)		
			id ++;
		} else {
			alert('Quantidade do produto '+ name +' não pode ser 0');
		};
	};
		
	removeProduct = function(id) {
		shoppingKart.splice(id,1);
	};
	
	clearKart = function() {
		shoppingKart.splice(0,shoppingKart.length);
		id = 0;
	};
	
	checkOut = function() {
		var result = [];
		var totalValue = 0;
		var log = '';
		
		for (var i = 0; i < shoppingKart.length;i++){
			// Calcula valor total
			totalValue += (shoppingKart[i].value * shoppingKart[i].qtd);
			
			// Insere log
			log = "\n" 
				+ "Produto: " + shoppingKart[i].name 
				+ "\n" 
				+ "Valor: " + shoppingKart[i].value 
				+ "\n" 
				+ "Qtd: " + shoppingKart[i].qtd 
				+ "\n";
			
			result.push(log);
			result.push('');
		};
		
		// Insere valor total
		log = "\n" + "Total: " + totalValue;
		result.push('');		
		result.push(log);		
		
		show(result);
		clearKart();
	};
	
	show = function(log){
		if (id === 0 ){
			alert("Carrinho vazio!");	
		} else {
			alert(log);			
		};
	};
	
	
	
	////// Inicializando ///////////////////////////////////////////////////////////////////////////////////////////////////////	
	showKart();
	
	////// TESTES //////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	// addProduct('0',20,1);
	// addProduct('1',25,3);
	// addProduct('2',28,1);
	// addProduct('3',24,9);
	// clearKart();
	// checkOut();
});