var db=openDatabase("itemDB","1.0","itemDB",65535); 


$(function(){

loadData(); 




$("#create").click(function(){
db.transaction(function(transaction){
	var sql="CREATE TABLE items "+
	"(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
	"item VARCHAR(100) NOT NULL,"+
	"quantity INT(5) NOT NULL)";
	transaction.executeSql(sql,undefined,function(){
		alert("Table is created successfully");
	},function(){
		alert("Table is already being created");
	})
});
});



$("#remove").click(function(){

if(!confirm("Are you sure to delete this table?","")) return;;
db.transaction(function(transaction){
	var sql="DROP TABLE items";
	transaction.executeSql(sql,undefined,function(){
		alert("Table is deleted successfully")
	},function(transaction,err){
		alert(err.message);
	})
});
});

$("#insert").click(function(){
var item=$("#item").val();
var qty=$("#quantity").val();
db.transaction(function(transaction){
var sql="INSERT INTO items(item,quantity) VALUES(?,?)";
transaction.executeSql(sql,[item,qty],function(){
	alert("New item is added successfully");
},function(transaction,err){
	alert(err.message);
})
})
})

$("#list").click(function(){
loadData();
})



function loadData(){
		$("#itemlist").children().remove();
	db.transaction(function(transaction){
		var sql="SELECT * FROM items ORDER BY id DESC";
		transaction.executeSql(sql,undefined,function(transaction,result){
if(result.rows.length){

for(var i=0;i<result.rows.length;i++){
	var row=result.rows.item(i);
	var item=row.item;
	var id=row.id;
	var quantity=row.quantity;
	$("#itemlist").append('<tr id="del'+id+'"><td>'+id+'</td><td>'+item+'</td><td id="newqty'+id+'">'+quantity+'</td><td><a href="#" class="btn btn-danger deleteitem" data-id="'+id+'">Delete</a> <a href="#" class="btn btn-primary updateitem" data-id="'+id+'">Update</a></td></tr>');
}
}else{
	$("#itemlist").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
}
		},function(transaction,err){
			alert('No table found. Click on "Create Table" to create table now');
		})
	})





setTimeout(function(){
	$(".deleteitem").click(function(){
var sure=confirm("Are you sure to delete this item?");
if(sure===true){
	var id=$(this).data("id");
db.transaction(function(transaction){
var sql="DELETE FROM items where id=?";
transaction.executeSql(sql,[id],function(){
	$("#del"+id).fadeOut();
	alert("Item is deleted successfully");
},function(transaction,err){
	alert(err.message);
})
});
}
})

$(".updateitem").click(function(){
var qty=prompt("Kindly enter new quantity",1);
if(qty!==null){
	var id=$(this).data("id");
db.transaction(function(transaction){
var sql="UPDATE items SET quantity=? where id=?";
transaction.executeSql(sql,[qty,id],function(){
	$("#newqty"+id).html(qty);
	alert("Item is updated successfully");
},function(transaction,err){
	alert(err.message);
})
});
}
})

},1000);


}




});



