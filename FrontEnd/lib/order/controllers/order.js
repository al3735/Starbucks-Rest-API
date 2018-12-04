var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.createOrder = function(req, res) {

	var productId = req.body.product_id;
	var productName = req.body.product_name;
	var description = req.body.product_description;
	var image = req.body.product_image;
	var price = req.body.product_price;
	var quantity = req.body.product_count;

	console.log(productName);
	console.log(price);
	console.log(quantity);

	var orderId;
	var userId;
	//var url = "52.52.214.192:3000";
	var url = "http://localhost:3000/user/234/order";

	axios.post(url, {
		Items: {
			Name: productName,
			Price: price,
			Quantity: 1,
			Size: "small"
		}
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		orderId = response.data.OrderId;
		console.log("orderID:" + orderId);
	}).catch(function (error) {
		console.log(error);
	});


	  var context = {
	    siteTitle: "My Order"
	  ,pageDescr: "Order Check Out"
      ,productId: productId
      ,description: description
	  ,product: productName
	  ,price: price
	  ,quantity: quantity
	  ,imageUrl: image
	  };

	  var template = __dirname + '/../views/order';
	  res.render(template, context);
 
};

exports.getOrderStatus = function(req, res) {
	var orderId = req.query.id;
	var userId;
	var orderData;

	var url = "http://localhost:3000/user/234/order/" + orderId;

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Order Detail"
	};

	axios.get(url).then(function (response) {
		console.log(response.data);
		context.orderData = response.data;
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});

	var template = __dirname + '/../views/orderDetail';

}

exports.completeOrder = function(req, res){

	 var orderId = req.query.order_id;
	 var userId;
	 var orderStatus;

	 var url = "http://localhost:3000/user/234/order/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);
	});


}

exports.orders = function(req, res) {

	var userId;
	var url = "http://localhost:3000/user/234/orders";
	let ordersData = [];

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Orders History"
	};


	axios.get(url).then(function (response){
		
		console.log(response.data);
		context.ordersData = response.data;
	//	console.log(context);
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});


	var template = __dirname + '/../views/orders';

}