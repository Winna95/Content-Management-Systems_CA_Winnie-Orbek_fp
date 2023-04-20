const jacketOne = {
    id: 1,
    productName: "Mountain Hardwear Exposure",
    price: 120,
    productText: "Our best-selling jacket with a waterproof outer layer. Perfect for all outdoor activities.",
    img: "images/Rainy-Days-Jacket1.png",
    color: "Grey",
    productType: "Tight fit",
    productCode: "RW231"
};

const jacketTwo = {
    id: 2,
    productName: "Tretorn Wings Rain",
    price: 120,
    productText: "A waterproof/breathable jacket built for stormy weather",
    img: "images/RainyDays-Jacket2.png",
    color: "Black",
    productType: "Regular fit",
    productCode: "RQ311"
};

const jacketThree = {
    id: 3,
    productName: "Short Hooded Coat",
    price: 120,
    productText: "A versatile, sharp, waterproof/breathable jacket for the city or the great outdoors.",
    img: "images/Rainy-Days-Jacket3.png",
    color: "Grey",
    productType: "Loose fit",
    productCode: "RM147"
};

const jacketFour = {
    id: 4,
    productName: "Storm Breaker",
    price: 120,
    productText: "The urban coat - who is an essential. It looks sharp and is perfect for hiking in the rain.",
    img: "images/RainyDays-Jacket4.png",
    color: "Black/Grey",
    productType: "Slim fit",
    productCode: "RX256"
};

const jacketFive = {
    id: 5,
    productName: "M Resolve Fleece",
    price: 120,
    productText: "The Warm, breathable fleece for colder conditions",
    img: "images/Rainy-Days-Jacket5.png",
    color: "Green",
    productType: "Regular fit",
    productCode: "RV401"
};

const jacketSix = {
    id: 6,
    productName: "Ki-Rainjacket",
    price: 120,
    productText: "A sleek, versatile combination of a waterproof shell jacket and an insulator jacket.",
    img: "images/Rainy-Days-Jacket6.png",
    color: "Grey/Red",
    productType: "Tight fit",
    productCode: "RY189"
};

const allJackets = [jacketOne, jacketTwo, jacketThree, jacketFour, jacketFive, jacketSix]

function getJacketById(id) {
    console.log(typeof id);
    return allJackets.find(thisJacket => thisJacket.id === parseInt(id));
}


export {
    allJackets,
    getJacketById
}