export const addItem = (item, next) => {
    let cart = []
    if (typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count: 1
        })
        //to avoid repeating save of the same product
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};