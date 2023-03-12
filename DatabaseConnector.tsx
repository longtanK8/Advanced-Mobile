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

const parseToArray = (data:String) => {
  let dataArray = Object.keys(data).map(function(index){
      let dataItem = data[index];
      // do something with person
      return dataItem;
  });
  return dataArray;
}