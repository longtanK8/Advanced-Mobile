type Customer = {
  email: String,
  name: String,
}

type customers = {

}

export const getCustomers = () => {
   return fetch('https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/customers.json')
     .then(response => response.json())
     .then(json => {
       return json.movies;
     })
     .catch(error => {
       console.error(error);
     });
 };