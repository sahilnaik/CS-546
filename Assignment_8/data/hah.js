const axios= require('axios');
const baseUrl="https://jsonmock.hackerrank.com/api/iot_devices";


async function numDevices(statusQuery, threshold, dateStr) {
    let pageNumber=1;
    const url=baseUrl+"/"+"search?status="+statusQuery+"&page="+pageNumber;
    async function getData(){
    const {data}=await axios.get(url)
    return data;
    }
    const collection = await getData();
    console.log(url)
    console.log(collection)
    
}
console.log(numDevices("online", 10, "2019-01-01"))