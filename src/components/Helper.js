export const numToCurrency = (num, currency) => {
    return num.toLocaleString('en-US', { style: 'currency', currency: currency })
}