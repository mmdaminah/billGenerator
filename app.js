const foods = [
    { id: "food1", name: "قیمه", image: "./gheyme.jpg", price: 30 },
    { id: "food2", name: "قورمه", image: "ghorme.jpg", price: 30 },
    { id: "food3", name: "زرشک پلو با مرغ", image: "morgh.jpg", price: 45 },
    { id: "food4", name: "کوبیده", image: "koobide.jpg", price: 40 },
];
const basket = {
    foods: [],
    calculatePrice(){
        return this.foods.reduce( (price, item)=> ( price += item.count * item.price ), 0)
    },
    calculateService(){
        return this.calculatePrice() * 9/100;
    },
    calculateTotalPrice(){
        return this.calculatePrice() + this.calculateService()
    },
    updateFood(id, count, food){
        const find = this.foods.find( item => item.id == id)
        if (find) {
            this.foods = this.foods.map( item => item.id == id ? {
                ...item,
                count: count
            } : item)
        }
        else{
            this.foods.push({...food, count:count})
        }
        render();
    } 
};
function update(id, count){
    foods.map((item)=>{
        if(item.id == id)
            basket.updateFood(id, count, item)
    })
}
function findCount(id){
    foods.map((item)=>{
        if(item.id == id)
            return item.count
    })
}
function render() {
    const foodContainer = document.querySelector("#food-container");
    const payment = document.querySelector("#payment");
    foodContainer.innerHTML = "";
    payment.innerHTML = ""
    foods.map((item) => {
        foodContainer.innerHTML += `
        <div class="row">
                <div class="col-3">0</div>
                <div class="col-6">
                    <div>${item.name}</div>
                    <div>${item.price}</div>
                    <div><span>${findCount(item.id)}</span><button onclick="update(\'${item.id}\',\'${2}\')" >inc</button><button>dec</button></div>
                </div>
            <div class="col-3"><img class="image" src=${item.image}></div>
        </div>
        `;
    });
    payment.innerHTML = `
        <div class="col-6 row">
            <div class="col-12">
                <button>تایید</button>
                <input type="text" placeholder="کد تخفیف">
            </div>
            <div class="col-12"><button>ثبت سفارش</button></div>
        </div>
        <div class="col-6">
            <div><span>0</span>جمع کل سفارشات</div>
            <div><span>0</span>حق سرویس و کارمزد</div>
            <div><span>0</span>تخفیف</div>
            <div><span>0</span>قیمت نهایی</div>
        </div>
    `
}
render();