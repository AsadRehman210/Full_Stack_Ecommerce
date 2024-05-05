const PriceFormate = ({ price, shipping_quantity }) => {
    return shipping_quantity ? Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        // maximumFractionDigits: 2,
    }).format(price * shipping_quantity) : Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        // maximumFractionDigits: 2,
    }).format(price);
}

export default PriceFormate;
