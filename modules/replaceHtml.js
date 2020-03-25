module.exports = (template, productDetail) => {
    let output = template.replace(/{%PRODUCT_NAME%}/g, productDetail.productName);

    output = output.replace(/{%IMAGE%}/g, productDetail.image);
    output = output.replace(/{%ID%}/g, productDetail.id);
    output = output.replace(/{%FROM%}/g, productDetail.from);
    output = output.replace(/{%PRICE%}/g, productDetail.price);
    output = output.replace(/{%QUANTITY%}/g, productDetail.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, productDetail.description);
    output = output.replace(/{%NUTRIENTS%}/g, productDetail.nutrients);
    if(productDetail.organic != true) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    
    return output;
}