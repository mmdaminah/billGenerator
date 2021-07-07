const foods = [
    { id: "1", name: "قیمه", image: "./gheyme.jpg", price: 30 },
    { id: "2", name: "قورمه", image: "ghorme.jpg", price: 30 },
    { id: "3", name: "زرشک پلو با مرغ", image: "morgh.jpg", price: 45 },
    { id: "4", name: "کوبیده", image: "koobide.jpg", price: 40 },
    { id: "5", name: "آبگوشت", image: "koobide.jpg", price: 50 },
];
const basket = {
    foods : [],
    increase(id){
        const find = this.foods.find((item)=> item.id == id)
        if(!find){
            const obj = {...foods[id-1], count : 1}
            this.foods.push(obj)
        }
        else{
            find.count++;
        }
        render()
    },
    decrease(id){
        const find = this.foods.find((item)=> item.id == id)
        if(!find){
            return
        }
        else{
            if(find.count-1 >=0)
                find.count--;
        }
        render()
    },
    getCount(id){
        const find = this.foods.find((item)=> item.id == id)
        if(!find){
            return 0
        }
        else{
            return find.count;
        }
    },
    getItemsPrice(id){
        const find = this.foods.find((item)=> item.id == id)
        if(!find){
            return 0
        }
        else{
            return find.count * find.price
        }
    },
    getAllPrices(){
        let sum = 0;
        this.foods.map((item)=> sum+=this.getItemsPrice(item.id))
        return sum
    },
    getService(){
        return this.getAllPrices() * 9/100;
    },
    getFinalPrice(){
        return this.getAllPrices() + this.getService()
    }
}
function render() {
    const foodContainer = document.querySelector("#food-container");
    const payment = document.querySelector("#payment");
    foodContainer.innerHTML = "";
    payment.innerHTML = "";
    foods.map((item)=>{
        foodContainer.innerHTML += `
            <div class="row my-4">
                <div class="col-3 d-flex justify-content-center align-items-center"><span>تومان</span>${basket.getItemsPrice(item.id)}</div>
                <div class="col-6 text-right">
                    <div>${item.name}</div>
                    <div style="direction:rtl">${item.price}تومان</div>
                    <div>${basket.getCount(item.id)}
                        <button class="btn btn-success" onclick="basket.increase(\'${item.id}\')">+</button>
                        <button class="btn btn-danger" onclick="basket.decrease(\'${item.id}\')">-</button>
                    </div>
                </div>
                <div class="col-3 text-center"><img class="image" src="${item.image}" alt=""></div>
            </div>
            <hr>
        `;
        payment.innerHTML = `
        <div class="col-6">
            <div dir="rtl"><input type="text" class="w-50 discount" placeholder="کد تخفیف" dir="rtl"><button class="btn btn-warning btn-sm m-1">تایید</button></div>
            <button class="btn btn-warning btn-lg text-white mt-3">ثبت سفارش</button>
          </div>
          <div class="col-6 text-right">
              <div class="py-1" dir="rtl">جمع کل سفارشات ${basket.getAllPrices(item.id)} تومان</div>
              <div class="py-1" dir="rtl">حق سرویس و کارمزد ${basket.getService(item.id)} تومان</div>
              <div class="py-1">تخفیف</div>
              <div class="py-1 text-center" dir="rtl">${basket.getFinalPrice(item.id)} تومان</div>
        </div>
    `;
    })
}
render()