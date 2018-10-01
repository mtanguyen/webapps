// 10/01/2018

let nums = [13, -12, 9, 666, 7];

function square(n) {return n*n;}
function square_elts(nums) {
    return nums.map(square); 
}

function my_map(arr, fn){
    let result = [];
    for(let elt of arr){
        result.push(fn(elt));
    }
    return result;   
}
//function square_elts(nums){
//    let result = [];
////    for (let i = 0; i < nums.length; i++)
////    higher order function = take a function as a parameter 
//    nums.forEach((num) => {
//         result.push(num * num);
//        
//    });
////    for (let num of nums){
////        result.push(nums[i] * nums[i]);
//       
//    
//    return result;
//}

Function hello(names){
    let result = [];
//    for (let i = 0; i <nums.length; i++)
    for (let name of names){
//        result.push('Hello, ' + names[i]);
        result.push('Hello, ' + name);
    }
    return result;   
}

//function evens(nums){
//    let result = [];
//    for(let n of nums){
//        if (n % 2 === 0){
//            result.push(n);
//        }
//    }
//    return result;   
//}

function evens(num){ 
    return nums.filter((n) => {return n%2 === 0;});
}

function my_filter(arr, pred){
    let result = [];
    for(let elt of arr){
        if (pred(elt)){
            result.push(elt);
        }
    }
    return result;   
}

function sum(nums){
    let result = 0; 
    for (let n of nums){
        result += n;
    }
    return result; 
}

function prod(nums){
    let result = 1; 
    for (let n of nums){
        result *= n;
    }
    return result; 
}

function reverse(s){
    let result = '';
    for (let i = s.length - 1; i >= 0; i--){
        result += s[i];
    }
    return result;
}

function my_reduce(arr, fn, init){
    let acc = init;
    for (let v of arr){
        acc = fn(acc, v);
        
    }
    return acc;
    
}

function sum_noisy(sum, eltt){
    console.log('sum: ', sum, 'elt:', elt);
    return sum + elt;
}
//for in = for iterating over objects, inherited objects work too
//for of = 

//high order functions = mapping, filtering, reducing 