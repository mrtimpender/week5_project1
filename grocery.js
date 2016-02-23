$(document).ready(function() {

// Running into managing list and removing Li's when list is emptied from the remove buttons
// Also updating the total amount once the list items are removed

  // Before we start anything, string up the css file, this javascript file, and
  // the jQuery CDN to grocery.html file.

  var groceries = [
  // {name: "Tomatoes", status: "needed", price: "3.99", quantity: 5},
  // {name: "Onions", status: "needed", price: "1.85", quantity: 2},
  // {name: "Cilantro", status: "needed", price: ".95", quantity: 1},
  // {name: "Limes", status: "complete", price: ".33", quantity: 3},
  // {name: "Jalapeno", status: "complete", price: ".15", quantity: 2}
  ];

$("<li></li>").appendTo("#list"); //add initial list item

//1. Display the existing list of grocery items (from the grocery array)
// in an unordered list in the "list" id that already exists in grocery.html.
// Display each item's name, price, and quantity.
// Ex: Tomatoes (5) @ $3.99
for (i = 0; i < groceries.length; i++) {
  var item = groceries[i];  // All array lines as Objects
  var lineItem = groceries[i].name + " (" + groceries[i].quantity + ") @ $" + groceries[i].price;
  $("<li>" + lineItem + "</li>").appendTo("#list");
};



//2. Use the inputs and add button to add grocery items to the beginning of the list.
// Default status should be "needed". The item should appear above the existing grocery items.


$("#addNew .btn").click(function() {

  var newItem = $("#addItem").val();
  var newPrice = $("#addPrice").val();
  var newQty = $("#addQuantity").val();
  var newStatus = "needed"

  var newLineItem = {
    name: newItem,
    status: newStatus,
    price: newPrice,
    quantity: newQty,
    };

  if ($("#list li").length == 0) {
    $("<li></li>").appendTo("#list"); // empty list
    $(".totalAmount").remove();
    updateTotalCost();
  } else if (newItem == "" || newPrice == "" || newQty == ""){
    alert("Please fill in all the fields to add to your list!");
  }
  else {
  $(".totalAmount").remove();

  groceries.unshift(newLineItem);
  var updateLineItems = function(newLineItem) {
    $("<li>" + newLineItem.name + " (" + newLineItem.quantity + ") @ $" + newLineItem.price + "</li>").insertBefore("#list li:first-child");
  };
  updateLineItems(groceries[0]);
  updateTotalCost();
  }; // closing else statement
});


var updateTotalCost = function() {
  var totalCost = 0;
  for (i=0; i < groceries.length; i++) {
    q = parseFloat(groceries[i].quantity);
    p = parseFloat(groceries[i].price);
    charge = (p * q);
    totalCost = totalCost + charge;
    displayTotal = parseFloat(totalCost).toFixed(2);
  };
  $("<h1 class='totalAmount'>$"+ + displayTotal + "</h1>").appendTo("h4 span");
};

$("<div id='startOver' class='btn btn-danger'>Start Over</div>").insertAfter("#addNew");
$("#startOver").click(function(){
    $("#list li").remove();
    $("<li></li>").appendTo("#list");
    groceries = [];
    $(".totalAmount").remove();

    if ($("#list li").length == 1) {
      displayTotal = 0;
    } else {
      updateTotalCost();
    };
});

$("<div id='removeFirst' class='btn btn-warning'>Remove 1st Item</div>").insertAfter("#addNew");
    $("#removeFirst").css("width", "100%");

    $("#removeFirst").click(function(){
      $("#list li:first-child").remove();
      groceries.shift();
      $(".totalAmount").remove();

      if ($("#list li").length == 1) {
        displayTotal = 0;
      } else {
        updateTotalCost();
      };
});

// $("<div id='removeLast' class='btn btn-warning'>Remove Last Item</div>").insertAfter("#removeFirst");
// $("#removeLast").css("background-color", "purple");
// $("#removeLast").css("border-color", "purple");
// $("#removeLast").css("width", "100%");
// $("#removeLast").click(function(){
//   $("#list li:last-child").remove();
//   var lastItem = parseFloat(groceries.length);
//   groceries.splice(lastItem, 1);
//   $(".totalAmount").remove();
//   updateTotalCost();
// if ($("#list li").length == 1) {
//   displayTotal = 0
// } else {
//   updateTotalCost();
// });

//3. Make sure that the grocery list displayed updates when you add an item to the list.

//4. Display the total cost of the groceries. Make sure this updates as you add items to the list.

//5. Put a check in to make sure users aren't adding items without a name, price, or quatity.







});
