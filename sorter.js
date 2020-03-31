class Sorter{
    constructor(){
        this.i = 0;
        this.j = 0;
        this.cache = {};
    }
    sort(inputArr){
        let arr = inputArr.slice(0);
        return this.quicksort(arr)
    }
    selectionSortStep(inputArr){
        let arr = inputArr.slice(0);
        if(this.cache['selection'] == undefined){
            this.cache['selection'] = {
                arrID:undefined,
                i:0,
                searchLength: arr.length,
            };
        }
        let cache = this.cache['selection']
        let max = undefined;
        let maxIndex = undefined;
        if(cache.arrID == undefined){
            cache.arrID = inputArr.join()
        }else if(cache.arrID != inputArr.join()){
            cache = {
                arrID:undefined,
                i:0,
                searchLength: arr.length,
            };
        }
        for(let i = cache.i; i < cache.i+1; i++){
            for(let j = 0; j<cache.searchLength; j++){
                if(max == undefined){
                    max = arr[j];
                    maxIndex = j;
                }
                if(max< arr[j]){
                    max = arr[j];
                    maxIndex = j;
                }
            }
            arr[maxIndex] = arr[cache.searchLength-1];
            arr[cache.searchLength-1] = max;
            cache.searchLength --;
        }
        cache.i ++;
        cache.arrID = arr.join()
        this.cache['selection'] = cache;
        let highlight = cache == undefined ? 0: cache.searchLength
        return [arr, [highlight]];
    }

    bubbleSortStep(inputArr){
        let arr = inputArr.slice(0);
        if(this.cache['bubble'] == undefined){
            this.cache['bubble'] = {
                i:0,
            };
        }
        let highlights = []
        let cache = this.cache['bubble']
        for(let i = cache.i; i< cache.i+1; i++){
            if(arr[i]>arr[i+1]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                highlights.push(i+1)
            }
        }
        cache.i ++;
        if(cache.i >= inputArr.length-1){
            cache.i = 0
        }
        this.cache['bubble'] = cache;
        return [arr, highlights]
    }

    quickSortStep(inputArr){
        let arr = inputArr.slice(0)
        if(this.cache['quick'] == undefined){
            this.cache['quick'] = {
                arrID: undefined,
                partitions:[],
                complete:[]
            };
        }
        let highlights = []
        let cache = this.cache['quick']
        if(cache.arrID == undefined){
            cache.arrID = inputArr.join();
        }else if(cache.arrID != inputArr.join()){
            cache.arrID = inputArr.join()
            cache.partitions = [];
            cache.complete = []
        }

        let newPartitions = []
        if(cache.partitions.length == 0){
            let [left, right] = this.partition(arr)
            newPartitions = [[left, right]];
        }else{
            for(let i = 0; i < cache.partitions.length; i++){
                if(cache.complete.includes(cache.partitions[i][0].concat(cache.partitions[i][1].join()))){
                    newPartitions.push([cache.partitions[i][0], cache.partitions[i][2]])
                    continue;
                }
                let [leftA, rightA] = this.partition(cache.partitions[i][0])
                let [leftB, rightB] = this.partition(cache.partitions[i][1])
                if(max(max(leftA.length, leftB.length), max(rightA.length, rightB.length)) < 4){
                    let left = leftA.concat(rightA);
                    let right = leftB.concat(rightB);
                    newPartitions.push([left, right])
                    cache.complete.push(left.concat(right).join())
                    continue;
                }else{
                    newPartitions.push([leftA, rightA]);
                    newPartitions.push([leftB, rightB]);
                }
            }
        }
        
        let result = [];
        for(let i = 0; i< newPartitions.length; i++){
            let [left, right] = newPartitions[i]
            result = result.concat(left)
            highlights.push(result.length-1)
            result = result.concat(right)
        }
        cache.arrID = result.join();
        cache.partitions = newPartitions;
        this.cache['quick'] = cache;

        return [result, highlights];
    }
    quicksort(inputArr){
        let arr = inputArr.slice(0)
        let[left, right] = this.partition(arr);
        left = left.length > 1 ? this.quicksort(left): left;
        right = right.length > 1 ? this.quicksort(right): right;
        return left.concat(right);
    }
    partition(inputArr){
        let arr = inputArr.slice(0)
        let pivot = arr[floor(random(0, arr.length))]
        let left = [];
        let right = [];
        for(let i = 0; i< arr.length; i++){
            if(arr[i]<pivot){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return [left, right]
    }
}