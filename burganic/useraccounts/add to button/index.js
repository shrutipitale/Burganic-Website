window.onload = function(){
	//cart box
	const iconShopping = document.querySelector('.iconShopping');
	const side = document.querySelector('.side');
	iconShopping.addEventListener("click",function()
	{
		
		side.classList.add('active');
	});
	



// localstorage basics

const cartbtn = document.getElementsByClassName('cart');
	let items = [];
	for(let i=0; i<cartbtn.length; i++){
		cartbtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item1 = {
						id:i+1,
						name:e.target.parentElement.children[1].children[0].textContent,
						price:parseFloat(e.target.parentElement.children[2].textContent),
						totalprice:parseFloat(e.target.parentElement.children[2].textContent),
						no:1,
										 
						
					};
				
					if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item1);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}
				else
				{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item1.name == data.name){
                            item1.no = data.no + 1;
                            item1.price=item1.price + data.price;						
						}
						else{
                              items.push(data);
						   }
					});
					items.push(item1);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}

			}else
			{
				alert('local storage is not working on your browser');
			}
		});
	}





// adding data to shopping cart 
	const iconShoppingP = document.querySelector('.iconShopping p');
	let no = 0;

	JSON.parse(localStorage.getItem('items')).map(data=>{
		
		no = no+data.no;
});
	iconShoppingP.innerHTML = no;


	//adding cartbox data in table

	const cardBoxTable = side.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>Item Id</th><th>Item Name</th><th> Item Quantity</th><th>Item Price</th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th>    <th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		    
		});
		
	}
	
	cardBoxTable.innerHTML = tableData;

	
function total(){
        
		 let subtotal = 0;
		 let t= JSON.parse(localStorage.getItem('items'))
		 t.map(data=>{
           subtotal = data.price += subtotal;
		});
		document.querySelector('.priceview h2').textContent=subtotal	
        }
		
		localStorage.setItem("total",JSON.stringify(total));
        total()
		
}