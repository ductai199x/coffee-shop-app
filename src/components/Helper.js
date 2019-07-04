export const numToCurrency = (num, currency) => {
    if (num)
        return num.toLocaleString('en-US', { style: 'currency', currency: currency })
    else
        return "0"
}

export const calculateTotal = (item) => {
    if (item.id === undefined)
        return null;
    else
        var total = 0;
        var key = item.component;
        item["component-name"].map((name, i) => (
            total = total + (key[name]["price"][key[name].amount.indexOf(key[name].choice)])
        ))
        // this.state.price = total;
        var scale = item["scale-factor"] === undefined ? [1,1,1] : item["scale-factor"];
        total = total * scale[item["item-size"].indexOf(item["choice-size"])];
        // total = numToCurrency(total, "USD");
        return total
        // this.setState({ viewingItem: item});
}

export const generateUuid = (item) => {
    if (item.id === undefined)
        return null;
    else {
        item.uuid = item.id;
        item["component-name"].map((key, index) => {
            if (item.component[key].choice !== item.component[key].default){
                item.uuid += "; " + key + ": " + item.component[key].choice;
            }
        })
        return 1;
    }
}

export const calculateTotalList = (itemList) => {
    var total = 0;
    itemList.map((content, i) => {
        if (content["quantity"] !== undefined){
            total = parseInt(total) + parseInt(content["quantity"]);
        }
        // 
     })
    return total;  
}