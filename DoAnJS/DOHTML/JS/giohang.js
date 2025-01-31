// // File giohang.js
// function addToCart(product) {
//   // Xử lý logic thêm sản phẩm vào giỏ hàng ở đây
//   console.log("Thêm sản phẩm vào giỏ hàng:", product);
//   // Ví dụ: Thêm sản phẩm vào một thẻ <ul> có class là 'show-cart-1'
//   var cartItem =
//       `<tr class='text-center'>
//           <td><img src='${product.image}' alt='${product.name}' style='width: 50px;'></td>
//           <td style='width: 100px;>${product.name}</td>
//           <td>${product.price}</td>
//           <td style='width: 100px;><input type='number' value='1'></td>
//           <td>${product.price}</td>
//           <td><button class='btn btn-danger btn-sm'>Xóa</button></td>
//       </tr>`;
//   $('.show-cart-1').append(cartItem);
// }

// Đoạn này là ví dụ, bạn cần điều chỉnh để phù hợp với cấu trúc của bạn




var shoppingCart = (function() {

    cart = [];
    function Item(id, name , img, price, count) {
      this.id   = id;
      this.name = name;
      this.img = img;
      this.price = price;
      this.count = count;
    }
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    var obj = {};
    
    obj.addItemToCart = function(id, name , img , price, count) {
      for(var item in cart) {
        if(cart[item].id === id) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(id, name, img , price, count);
      cart.push(item);
      saveCart();
    }
  
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    obj.removeItemFromCart = function(id) {
        for(var item in cart) {
          if(cart[item].id === id) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
    obj.removeItemFromCartAll = function(id) {
      for(var item in cart) {
        if(cart[item].id === id) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
  
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += (cart[item].price * cart[item].count);
      }
      return Number(totalCart.toFixed(0));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toLocaleString('de-DE');
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();
  var pro = [];
  
  function saveproduct() {
    sessionStorage.setItem('shopping', JSON.stringify(pro));
  }
    // Load cart
  function loadproduct() {
    pro = JSON.parse(sessionStorage.getItem('shopping'));
  }
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var id = $(this).data('id');
    var name = $(this).data('name');
    var img = $(this).data('img');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(id, name,img, price, 1);
    alert("Sản phẩm đã được thêm vào giỏ hàng")
    displayCart();
  });
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
      window.location.reload();
    displayCart();
  });
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    // for(var i in cartArray) {
    //   output += "<tr class='text-center sp-cart'>"
    //     + "<td><img src='../image/" + cartArray[i].img + "' style='width:100px'></td>" 
    //     + "<td class='name-title'>" + cartArray[i].name + "</td>" 
    //     + "<td class='name-title'>" + cartArray[i].price.toLocaleString('de-DE') + "₫</td>"
    //     + "<td><button class='minus-item text-dark cart-count input-group-addon btn btn-outline-primary' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">-</button>"
    //     +""
    //     +  "<button class='btn cart-count'>" +cartArray[i].count+"</button>" 
    //     + "<button class='plus-item cart-count btn btn-primary text-dark input-group-addon' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">+</button>"
    //     +"</td>"
    //     + "<td class='name-title'>" + cartArray[i].total+ "₫</td>"   
    //     + "<td><button class='delete-item btn btn-outline-danger' style='width:40px;' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">X</button></td>"
       
    //     +  "</tr>";
    // }
    for (var i in cartArray) {
      output += "<tr class='text-center sp-cart'>"
        + "<td><img src='../image/" + cartArray[i].img + "' style='width:100px'></td>" 
        + "<td class='name-title' style='width: 300px;'>" + cartArray[i].name + "</td>" 
        + "<td class='name-title'>" + cartArray[i].price.toLocaleString('de-DE') + "₫</td>"
        + "<td style='width: 200px;'><button class='minus-item text-dark cart-count input-group-addon btn btn-outline-primary' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>-</button>"
        + "<button class='btn cart-count'>" + cartArray[i].count + "</button>" 
        + "<button class='plus-item cart-count btn btn-primary text-dark input-group-addon' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>+</button>"
        + "</td>"
        + "<td class='name-title'>" + cartArray[i].total + "₫</td>"   
        + "<td><button class='delete-item btn btn-outline-danger' style='width:40px;' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>X</button></td>"
        + "</tr>";
    }
  //   $('.show-cart-1').html(output);
  //   $('.total-cart').html(shoppingCart.totalCart());
  //   $('.total-count').html(shoppingCart.totalCount());
  // }
  $(".show-cart-1").html(output);
  $(".total-cart.total-1").html(formatCurrency(shoppingCart.totalCart()));
  $(".total-cart.total").html(formatCurrency(shoppingCart.totalCart()));
}
// Format number as currency
function formatCurrency(num) {
  return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '').trim() + 'đ';
}

$(document).ready(function() {
  updateCart();
});



  
  $('.show-cart-1').on("click", ".delete-item", function(event) {
    var id = $(this).data('id')
    shoppingCart.removeItemFromCartAll(id);
    alert("Sản phẩm sẽ bị xóa khỏi giỏ hàng?")
    displayCart();
  })
  $('.show-cart-1').on("click", ".minus-item", function(event) {
    var id = $(this).data('id')
    shoppingCart.removeItemFromCart(id);
    displayCart();
  })
  $('.show-cart-1').on("click", ".plus-item", function(event) {
    var id = $(this).data('id')
    shoppingCart.addItemToCart(id);
    displayCart();
  })
  $('.show-cart-1').on("change", ".item-count", function(event) {
     var id = $(this).data('id');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(id, count);
    displayCart();
  });
  displayCart();
  var info= [];
  var donhang =[];
  function Savedon(){
    localStorage.setItem('listdon',JSON.stringify(donhang))
    }

//lấy sản phẩm 
function loaddon(){
donhang = JSON.parse(localStorage.getItem('listdon'));
} 

if (localStorage.getItem("listdon") == null) {
Savedon();
}
var checkCart= function(){
  if ((document.getElementById("inputnguoinhan").value=="")){
    $(".nguoinhan").css("display","block");
  }else{
    $(".nguoinhan").css("display","none");
  }
  if ((document.getElementById("inputsdt").value=="")){
    $(".sdt").css("display","block");
  }else{
    $(".sdt").css("display","none");
  }
  
  if ((document.getElementById("inputdiachi").value=="")){
    $(".diachi").css("display","block");
  }else{
    $(".diachi").css("display","none");
  }
  if ((document.getElementById("inputthanhtoan").value==0)){
    $(".thanhtoan").css("display","block");
  }
  else{
    $(".thanhtoan").css("display","none");
  }
  if ((document.getElementById("inputtinh").value==0)){
    $(".tinh").css("display","block");
  }
  else{
    $(".tinh").css("display","none");
  }
  if ((document.getElementById("inputemail").value=="")){
    $(".email").css("display","block");
  }
  else{
    $(".email").css("display","none");
  }
  if ((document.getElementById("inputnguoinhan").value!="")&&(document.getElementById("inputsdt").value!="")&&(document.getElementById("inputdiachi").value!="")&&(document.getElementById("inputemail").value!="")){
   
    infoCart();
 }
}
var add_don = function(){
  var thanhtoan;
  var tinh;
  
      if (document.getElementById("inputthanhtoan").value==1){
          thanhtoan ="Thanh toán bằng tiền mặt";
      }
      if (document.getElementById("inputthanhtoan").value==2){
          thanhtoan ="InternetBanking";
      }
      if (document.getElementById("inputthanhtoan").value==3){
          thanhtoan ="Zalopay";
      }
      if (document.getElementById("inputthanhtoan").value==4){
          thanhtoan ="Momo";
      }
      if (document.getElementById("inputtinh").value==1){
          tinh ="Huế";
      }
      if (document.getElementById("inputtinh").value==2){
          tinh ="Đà Nẵng";
      }
      if (document.getElementById("inputtinh").value==3){
          tinh ="Hồ Chí Minh";
      }
      if (document.getElementById("inputtinh").value==4){
          tinh ="Hà Nội";
      }
      if (document.getElementById("inputtinh").value==5){
          tinh ="Quảng Nam";
      }
      if (document.getElementById("inputtinh").value==6){
          tinh ="Quảng Ngãi";
      }
      if (document.getElementById("inputtinh").value==7){
          tinh ="Quảng Trị";
      }
      loaddon();
  var item = {
    id : donhang.length+1,
    user : document.getElementById("inputnguoinhan").value,
    phone:document.getElementById("inputsdt").value,
    address :document.getElementById("inputdiachi").value +"-"+ tinh ,
    thanhtoan : thanhtoan,
    email: document.getElementById("inputemail").value,
    total :shoppingCart.totalCart(),
    ghichu: document.getElementById("inputghichu").value,
    trangthai : "Đang xử lí",
  }
  loaddon();
  donhang.push(item);
  
  Savedon();
}
 
 

  function xacnhan(){
    $(".thongtins").css("display","none");
    $("#xacnhandathang").css("display","block")
  }
  function infoCart(){
    var thanhtoan;
    var tinh;
    
        if (document.getElementById("inputthanhtoan").value==1){
            thanhtoan ="Thanh toán bằng tiền mặt";
        }
        if (document.getElementById("inputthanhtoan").value==2){
            thanhtoan ="InternetBanking";
        }
        if (document.getElementById("inputthanhtoan").value==3){
            thanhtoan ="Visa Card";
        }
        if (document.getElementById("inputthanhtoan").value==4){
            thanhtoan ="Paypal";
        }
        if (document.getElementById("inputtinh").value==1){
            tinh ="Hà Nội";
        }
        if (document.getElementById("inputtinh").value==2){
            tinh ="Đà Nẵng";
        }
        if (document.getElementById("inputtinh").value==3){
            tinh ="Hồ Chí Minh";
        }
        if (document.getElementById("inputtinh").value==4){
            tinh ="Bình Định";
        }
        if (document.getElementById("inputtinh").value==5){
            tinh ="Quảng Ngãi";
        }
    
    
        document.getElementById("inputnguoinhan1").innerHTML=document.getElementById("inputnguoinhan").value;
        document.getElementById("inputsdt1").innerHTML = document.getElementById("inputsdt").value;
        document.getElementById("inputdiachi1").innerHTML= document.getElementById("inputdiachi").value +"-"+ tinh ,
        document.getElementById("inputthanhtoan1").innerHTML = thanhtoan,
         
        document.getElementById("inputemail1").innerHTML= document.getElementById("inputemail").value,
        document.getElementById("inputghichu1").innerHTML =document.getElementById("inputghichu").value;
        add_don();
        $(".cartt").attr("data-dismiss", "modal");
        $(".thongtins").css("display","block");
      }


    



// function addToCart(product) {
//   console.log("Thêm sản phẩm vào giỏ hàng:", product);
//   var cartItem =
//     `<tr class='text-center'>
//       <td><img src='${product.image}' alt='${product.name}' style='width: 50px;'></td>
//       <td style='width: 150px;'>${product.name}</td>
//       <td>${product.price}</td>
//       <td style='width: 100px;'><input type='number' value='1' class='form-control cart-count'></td>
//       <td>${product.price}</td>
//       <td><button class='btn btn-danger btn-sm'>Xóa</button></td>
//     </tr>`;
//   $('.show-cart-1').append(cartItem);
// }

// var shoppingCart = (function() {
//   cart = [];
//   function Item(id, name, img, price, count) {
//     this.id = id;
//     this.name = name;
//     this.img = img;
//     this.price = price;
//     this.count = count;
//   }
//   function saveCart() {
//     sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
//   }
//   function loadCart() {
//     cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
//   }
//   if (sessionStorage.getItem("shoppingCart") != null) {
//     loadCart();
//   }
//   var obj = {};

//   obj.addItemToCart = function(id, name, img, price, count) {
//     for (var item in cart) {
//       if (cart[item].id === id) {
//         cart[item].count++;
//         saveCart();
//         return;
//       }
//     }
//     var item = new Item(id, name, img, price, count);
//     cart.push(item);
//     saveCart();
//   }

//   obj.setCountForItem = function(id, count) {
//     for (var i in cart) {
//       if (cart[i].id === id) {
//         cart[i].count = count;
//         break;
//       }
//     }
//     saveCart();
//   };
//   obj.removeItemFromCart = function(id) {
//     for (var item in cart) {
//       if (cart[item].id === id) {
//         cart[item].count--;
//         if (cart[item].count === 0) {
//           cart.splice(item, 1);
//         }
//         break;
//       }
//     }
//     saveCart();
//   }
//   obj.removeItemFromCartAll = function(id) {
//     for (var item in cart) {
//       if (cart[item].id === id) {
//         cart.splice(item, 1);
//         break;
//       }
//     }
//     saveCart();
//   }

//   obj.clearCart = function() {
//     cart = [];
//     saveCart();
//   }

//   obj.totalCount = function() {
//     var totalCount = 0;
//     for (var item in cart) {
//       totalCount += cart[item].count;
//     }
//     return totalCount;
//   }
//   obj.totalCart = function() {
//     var totalCart = 0;
//     for (var item in cart) {
//       totalCart += (cart[item].price * cart[item].count);
//     }
//     return Number(totalCart.toFixed(0));
//   }

//   obj.listCart = function() {
//     var cartCopy = [];
//     for (i in cart) {
//       item = cart[i];
//       itemCopy = {};
//       for (p in item) {
//         itemCopy[p] = item[p];
//       }
//       itemCopy.total = Number(item.price * item.count).toLocaleString('de-DE');
//       cartCopy.push(itemCopy);
//     }
//     return cartCopy;
//   }
//   return obj;
// })();

// $('.add-to-cart').click(function(event) {
//   event.preventDefault();
//   var id = $(this).data('id');
//   var name = $(this).data('name');
//   var img = $(this).data('img');
//   var price = Number($(this).data('price'));
//   shoppingCart.addItemToCart(id, name, img, price, 1);
//   alert("Sản phẩm đã được thêm vào giỏ hàng");
//   displayCart();
// });

// $('.clear-cart').click(function() {
//   shoppingCart.clearCart();
//   window.location.reload();
//   displayCart();
// });

// function displayCart() {
//   var cartArray = shoppingCart.listCart();
//   var output = "";
//   for (var i in cartArray) {
//     output += "<tr class='text-center sp-cart'>"
//       + "<td><img src='../image/" + cartArray[i].img + "' style='width:100px'></td>" 
//       + "<td class='name-title' style='width: 300px;'>" + cartArray[i].name + "</td>" 
//       + "<td class='name-title'>" + cartArray[i].price.toLocaleString('de-DE') + "₫</td>"
//       + "<td style='width: 200px;'><button class='minus-item text-dark cart-count input-group-addon btn btn-outline-primary' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>-</button>"
//       + "<button class='btn cart-count'>" + cartArray[i].count + "</button>" 
//       + "<button class='plus-item cart-count btn btn-primary text-dark input-group-addon' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>+</button>"
//       + "</td>"
//       + "<td class='name-title'>" + cartArray[i].total + "₫</td>"   
//       + "<td><button class='delete-item btn btn-outline-danger' style='width:40px;' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'>X</button></td>"
//       + "</tr>";
//   }
//   $('.show-cart-1').html(output);
//   $('.total-cart').html(shoppingCart.totalCart());
//   $('.total-count').html(shoppingCart.totalCount());
// }

// $('.show-cart-1').on("click", ".delete-item", function(event) {
//   var id = $(this).data('id');
//   shoppingCart.removeItemFromCartAll(id);
//   alert("Sản phẩm sẽ bị xóa khỏi giỏ hàng?");
//   displayCart();
// });

// $('.show-cart-1').on("click", ".minus-item", function(event) {
//   var id = $(this).data('id');
//   shoppingCart.removeItemFromCart(id);
//   displayCart();
// });

// $('.show-cart-1').on("click", ".plus-item", function(event) {
//   var id = $(this).data('id');
//   var name = $(this).data('name');
//   var img = $(this).data('img');
//   var price = Number($(this).data('price'));
//   shoppingCart.addItemToCart(id, name, img, price, 1);
//   displayCart();
// });

// $('.show-cart-1').on("change", ".item-count", function(event) {
//   var id = $(this).data('id');
//   var count = Number($(this).val());
//   shoppingCart.setCountForItem(id, count);
//   displayCart();
// });

// displayCart();
