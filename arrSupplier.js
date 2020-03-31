class ArrSupplier{
    constructor(){

    }
    randomArr(length, a, b){
        let arr = [];
        for(let i = 0; i<length;i++){
            arr.push(random(a, b));
        }
        return arr;
    }
    straightArr(length, a, b){
        let arr = [];
        let step = (b-a)/length;
        for(let i = 0; i<length;i++){
            arr.push((i+1)*step);
        }
        return arr
    }
    randomStraightArr(length, a, b){
        var arr = this.straightArr(length, a, b);
        return this.randomizeArr(arr);
    }
    randomizeArr(arr){
        let result = [];
        while(arr.length != 0){
            let i = floor(random(0, arr.length))
            result.push(arr[i]);
            arr.splice(i, 1)
        }
        return result;
    }
}