const questionOne = function questionOne(arr) {
   // Implement question 1 here
    let res=[]
    let resObj={};
    let bool=true;
    if(arr==null){
        resObj={};
    }
    else{
        for(let i=0; i<arr.length; i++){
            res= Math.abs(Math.pow(arr[i],2) - 7);
            if(res<=1){
                bool=false;
            }
            for (let j=2; j<res; j++){
                if(res%j==0)
                bool= false;
            }
                
            resObj[res]=bool;
            bool=true;
        }
    }
    return(resObj);
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    let res2=[];
    if(arr==null){
        return res2;
    }
    for(let i=0;i<arr.length; i++){
        if(!res2.includes(arr[i])){
            res2.push(arr[i]);
        }
    }
    return res2;
    
}

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    let removeDup=questionTwo(arr);
    let resObj = {};
    let temp=[];
    for(let i=0;i<removeDup.length;i++){
        let sorted= removeDup[i].split('').sort().join('');
        //https://stackoverflow.com/questions/30912663/sort-a-string-alphabetically-using-a-function
        //Referred for sorting letters in the word.
        for(let j=0;j<removeDup.length;j++){   
            if(sorted == removeDup[j].split('').sort().join('')){
                temp.push(removeDup[j]);
            }  
        }
        if(temp.length>1){
            resObj[sorted] = temp;
            temp=[];
        }
        else{
            temp = [];
        }
    }
    return resObj;

}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let fact1, fact2, fact3;
    function fact(num){
        
        if(num==0){
            num=1;
        }
        else{
            for(let i=num-1;i>0;i--){
                num = num*i;
            }
        }
        return num;
    }
    let res4= (fact(num1) + fact(num2) + fact(num3))/((num1+num2+num3)/3);
    return Math.floor(res4);
}

module.exports = {
    firstName: "SAHIL", 
    lastName: "NAIK", 
    studentId: "10475519",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};