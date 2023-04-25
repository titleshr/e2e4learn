const fetch = require("node-fetch");
const { Headers } = fetch;
const { v4: uuidv4 } = require("uuid");



async function CreateCustomer(){
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "Wk9F581gSSUrLwgsC7TWBnQi0GAs93Kw");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("cust_ref_id", uuidv4());
  urlencoded.append("firstname", "Peeraphat");
  urlencoded.append("lastname", "Waikijjee");
  urlencoded.append("date_of_birth", "2015/01/11");
  urlencoded.append("template_id", "1");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response_customer = await new Promise((resolve) => {
     fetch(
      "https://sit-sgecua-api.thailife.com/ekyc/v1/customer",
      requestOptions
    ).then(data => resolve(data.json()))
  })

  console.log(JSON.stringify(response_customer,null,2),"response_customer")

  return response_customer
  

}



 


async function generateLink(){

  const {cust_uuid}  = await CreateCustomer();
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "Wk9F581gSSUrLwgsC7TWBnQi0GAs93Kw");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  

  const link_response = await new Promise((resolve) => {
     fetch(
      `https://sit-sgecua-api.thailife.com/ekyc/v1/util/genlink?cust_uuid=${cust_uuid}`,
      requestOptions
    ).then(data => resolve(data.json()))
  });





   return link_response




}

 



  



module.exports = generateLink