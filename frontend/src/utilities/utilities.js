export default function formatCurrency(num) {
    if (typeof (num) === 'string') {
        return "$" + Number(num.toFixed(2)).toLocaleString();
    }
    if (typeof (num) === 'number') {
        return "$" + num.toFixed(2).toLocaleString()
    }

}