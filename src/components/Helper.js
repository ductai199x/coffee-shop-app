export const numToCurrency = (num, currency) => {
    if (num)
        return num.toLocaleString('en-US', { style: 'currency', currency: currency })
    else
        return "0"
}