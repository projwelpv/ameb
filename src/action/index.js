// import { get } from "../api/APIController";

import { get } from "../api/config/APIController";
// import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./cart";

export const receiveProducts = () => {
  return new Promise((resolve, reject) => {
    get("products2")
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };

export const receiveProductsById = (id) => {
  let url = `product?productId=${id}`;
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product details response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const ordersById = (id) => {
  let url = `order?orderId=${id}`;
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const checkoutStripePayemt = (Cart) => {
  // let dispatch = useDispatch();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Bearer sk_test_51LueYMSJR3MKnRF3268B3qx0LDEK9geJ451EKxtEhljfXbYBJMLaeb1DqV0vqUo9IeVDIaGx4xIjRRX2IrAXjNqQ00Kg4KMZdq"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("cancel_url", "http://49.206.253.146:2026/Error");
  urlencoded.append("success_url", "http://49.206.253.146:2026/payment/15");
  urlencoded.append("customer_email", "srikanth@cnetric.com");

  Cart.forEach((each, index) => {
    return (
      urlencoded.append(`line_items[${index}][price_data][currency]`, "usd"),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][name]`,
        each.productVariant.name
      ),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][description]`,
        each.productVariant.name
      ),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][images][0]`,
        each.productVariant.images[0].url
      ),
      urlencoded.append(
        `line_items[${index}][price_data][unit_amount]`,
        each?.productVariant.price
      ),
      urlencoded.append(
        `line_items[${index}][quantity]`,
        each.quantity.toString()
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][display_name]`,
        "BlueDart"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][amount]`,
        "1000"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][currency]`,
        "usd"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][type]`,
        "fixed_amount"
      )
    );
  });
  urlencoded.append("mode", "payment");
  urlencoded.append(`payment_method_types[0]`, "card");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://api.stripe.com/v1/checkout/sessions", requestOptions)
    .then((response) =>
      // response.text()
      response.json()
    )
    .then((result) => {
      if (result) {
        // console.log("stripe responce", result.url);
        // localStorage.removeItem("LocalCartItems");
        // activeOrder();
        // getCustomerLoginCart();
        // dispatch(getCartItems());
        getCartItems();
        window.location.replace(result.url);
      }
    })
    .catch((error) => console.log("error", error));
};

export const receiveProductsSearch = (search) => {
  return new Promise((resolve, reject) => {
    get(`search?query=${search}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};


export const receiveGetContent = () => {
  return new Promise((resolve, reject) => {
    get("getContent")
      .then((response) => {
        if (response.status === 200) {

          resolve(response.data);

        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};