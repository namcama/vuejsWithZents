<template>
    <div>
        <div>
            hoc nhom 1
        </div>
    </div>
</template>
<script>
    export default {
        name : 'hocNhom1',
        data() {
            return {
                arr_1:[1, 2, 3, 4],
                arr_2:[5, 6, 7, 8],
                arr_3:[9, 10, 11, 12],

                word:[
                    'nam',
                    'thuy',
                    'dungthamtu',
                    'baothanh',
                    'zents',
                ]

            }
        },
        methods: {
            //noi cac mang voi nhau
            handleConcat(){
                let resultDouble = this.arr_1.concat(this.arr_2)
                console.log(resultDouble);
                let resultTripple = this.arr_1.concat(this.arr_2, this.arr_3)
                console.log(resultTripple);
            },
            //loc ra 1 phan tu trong mang(khong lam thay doi mang ban dau maf tra ve 1 mang moi)
            handleFilter(){
                let result = this.word.filter(function (word) {
                    return word.length >6
                })
                console.log(result);
            },
            //kiem tra xem phan tu da cho co trong mang khong(0 lam thay doi mang ban dau)
            handleIncludes(){
                let arr = ['a','b','c','d']
                console.log(arr.includes('b'));
            },
            //tao ra 1 chuoi moi bang cac phan tu cua mang ban dau
            handleJoin(){
                let result = this.word.join()
                console.log(result);
            },
            //tim ra 1 phan tu thoa man dieu kien(tra ve phan tu dau tien)
            handleFind(){
                let result = this.arr_2.find(function (a) {
                    return a <10
                })
                console.log(result);
            },
            // xoa phan tu cuoi cung khoi mang
            handlePop(){
                console.log(this.word);
                this.word.pop()
                console.log(this.word);
            },
            //xoa phan tu dau tien khoi mang
            handleShift(){
                console.log(this.word);
                this.word.shift()
                console.log(this.word);
            },
            //them 1 hoac nhieu phan tu
            handlePush(){
                console.log(this.word);
                this.word.push('trang')
                console.log(this.word);
                this.word.push('phan tu 1','phan tu 2' ,'phan tu 3')
                console.log(this.word);
            },
            // them 1 hoac nhieu phan tu vao dau mang
            handleUnshift(){
                console.log(this.word);
                this.word.unshift('phan tu 1')
                console.log(this.word);
            },
            //dao nguoc mang
            handleReverse(){
                console.log(this.arr_1);
                this.arr_1.reverse()
                console.log(this.arr_1);
            },
            //xu ly chuoi
            //tra ki tu o vi tri da chi dinh theo index
            handleChartAt(){
                let word ='hello word'
                let result = word.charAt(8)
                console.log(result);
            },
            //tim kiem vi tri dau tien cua chuoi trong 1 chuoi khac(tra ve -1 neu khong tim thay)
            handleIndexOf(){
                let word ='toi la nguyen nhu nam gioi tinh nam 20 tuoi'
                let result=word.indexOf('nam')
                console.log(result);
                let result1=word.indexOf('nam', 34)
                console.log(result1);
            },
            //tim kiem vi tri cuoi cung cua chuoi trong 1 chuoi khac(tra ve -1 neu khong tim thay)
            handleLastIndexOf(){
                let word ='toi la nguyen nhu nam gioi tinh nam 20 tuoi'
                let result=word.lastIndexOf('nam')
                console.log(result);
                let result1=word.lastIndexOf('nam', 20)
                console.log(result1);
            },
            //thay the tu dau tien (phu hop) trong chuoi
            handleReplace(){
                let word ='toi la nguyen nhu nam gioi tinh nam 20 tuoi'
                console.log(word.replace("nam","thuy"));
            },
            //thay the tat ca
            handleRepalceAll(){
                let word ='toi la nguyen nhu nam gioi tinh nam 20 tuoi'
                console.log(word.replaceAll("nam","BBB")); 
            },
            //cat chuoi\
            handleSlice(){
                let word ='toi la nguyen nhu nam gioi tinh nam 20tuoi'
                console.log(word.slice(4));
                console.log(word.slice(4,30));
                console.log(word.slice(-5));
                console.log(word.slice(-10,-1));
            },
            //cat chuoi thanh mang theo dieu kien
            handleSplit(){
                let str='hello word'
                let result = str.split()
                let result1 = str.split("")
                let result2 = str.split("",6)
                console.log(result);
                console.log(result1);
                console.log(result2);
            },
            //bien tat ca cac chu trong chuoi thanh chu thuong
            handleToLowerCase(){
                let str ='HELLo Viet Nam'
                console.log(str.toLowerCase());
            },
            //bien tat ca chu trong chuoi thanh chu in hoa
            handleToUpperCase(){
                let str ='HELLo Viet Nam'
                console.log(str.toUpperCase());
            },
            //loai bo khoang trang o dau chuoi
            handleTrimStrat(){
                let str ='  toi la nam   '
                console.log(str.trimStart());
            },
            //loia bo khoang trang o 2 dau chuoi
            handleTrim(){
                let str ='    toi la nam   '
                console.log(str.trim());
            },
            //loai bo khoang trang o cuoi chuoi
            handleTrimEnd(){
                let str ='    toi la nam   '
                console.log(str.trimEnd());
            }

        },
        mounted() {
            //this.handleConcat();
            //this.handleFilter();
            //this.handleIncludes();
            //this.handleJoin();
            //this.handleFind();
            //this.handlePop();
            //this.handleShift();
            //this.handlePush();
            //this.handleUnshift();
            //this.handleReverse();
            //this.handleChartAt();
            //this.handleIndexOf();
            //this.handleLastIndexOf();
            //this.handleReplace();
            //this.handleRepalceAll();
            //this.handleSlice();
            //this.handleSplit();
            //this.handleToLowerCase();
            //this.handleToUpperCase();
            //this.handleTrimStrat();
            //this.handleTrim();
            this.handleTrimEnd();
        },  
    }
</script>
<style lang="scss">
    
</style>