export const numToCurrency = (num, currency) => {
    if (num)
        return num.toLocaleString('en-US', { style: 'currency', currency: currency })
    else
        return "0"
}

export const calculateTotal = (item) => {
    var total = 0;
    var key = item.component;
    item["component-name"].map((name, i) => (
        total = total + (key[name]["price"][key[name].amount.indexOf(key[name].choice)])
    ))
    // this.state.price = total;
    var scale = item["scale-factor"] === undefined ? [1,1,1] : item["scale-factor"];
    total = total * scale[item["item-size"].indexOf(item["choice-size"])];
    total = numToCurrency(total, "USD");
    return total
    // this.setState({ viewingItem: item});

}