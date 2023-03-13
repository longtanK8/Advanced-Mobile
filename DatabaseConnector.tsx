import { useContext } from "react";
import AppContext from "./AppContext";


export const getOrdersByUserId = (id:string) => {
  // useEffect(() => {
    // fetch data
  const dataFetch = async () => {
    const data = await (
      await fetch(
        "https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
      )
    ).json();

    console.log(parseToArray(data));

    // set state when the data received
    const dataArray = parseToArray(data);
    if(dataArray){
      let returnData: any[] = [];
      dataArray.forEach(data => {
        if(data.userId == id){
          returnData.push(data);
        }
      })
      return returnData;
    }else{
      return null;
    }
  };
  return dataFetch();
}

export const setOrder = (order:object) => {
  fetch('https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
}

export const getFavoriteByUserExternalId = (externalId:string) => {
  const dataFetch = async () => {
      const data = await (
        await fetch(
          `https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/users/${externalId}.json`
        )
      ).json();

      // console.log(parseToArray(data))
      let parsedData = JSON.parse(data);

      // set state when the data received
      // const dataArray = parseToArray(data);
      if(parsedData){
        return parsedData.favorites || null;
      }else{
        return null;
      }
    };
    return dataFetch();
}

export const updateFavorites = (favorites:any[], user:any) => {
  user.favorites = favorites;
  updateUser(user);
  return user;
}

export const updateUser = (user:any) => {
  // const { globalVariable, setGlobalVariable } = useContext(AppContext);

  fetch(`https://delivery-food-379309-default-rtdb.asia-southeast1.firebasedatabase.app/users/${user.externalId}.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  // setGlobalVariable({"user":user, "location": user.location})
}

const parseToArray = (data:String) => {
  let dataArray = Object.keys(data).map(function(index){
      let dataItem = data[index];
      dataItem.externalId = index;
      // do something with person
      return dataItem;
  });
  return dataArray;
}