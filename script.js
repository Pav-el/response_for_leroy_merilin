const response = {
  displayedName: {
    displayedName: {
      value: ["Профиль маячковый ПВХ 10 мм L3м"],
      description: "Полное наименование товара для клиента"
    }
  },
  stock: {
    stocks: {
      "34": {
        "2": "35",
        "3": "42",
        "4": "58",
        "5": "57",
        "6": "112",
        "20": "51",
        "22": "78",
        "26": "34",
        "32": "22",
        "35": "358",
        "40": "28",
        "43": "68",
        "45": "58",
        "49": "31",
        "51": "29",
        "56": "42",
        "62": "26",
        "64": "0",
        "65": "57",
        "86": "15",
        "114": "41",
        "117": "46",
        "143": "46",
        "162": "4",
        "171": "0",
        "176": "12"
      }
    }
  }
};

function Report(response) {
  this.productName = response.displayedName.displayedName.value[0];
  this.stocks = response.stock.stocks;
  this.storesWithProduct = (function (stocks) {
    let stores = [];
    for (let region in stocks) {
      const regionalStoresList = stocks[region];
      for (let store in regionalStoresList) {
        const qty = Number(regionalStoresList[store]);
        if (qty > 0) {
          stores.push(Number(store));
        }
      }
    }
    return `In stock in stores №: ${stores}`;
  })(this.stocks);
  
  this.maxStock = (function (stocks, productName) {
    let maxQty = 0;
    let storeWithMaxQty = null;
    for (let region in stocks) {
      const regionalStoresList = stocks[region];
      for (let store in regionalStoresList) {
        const qty = Number(regionalStoresList[store]);
        if (qty > maxQty) {
          maxQty = qty;
          storeWithMaxQty = Number(store);
        }
      }
    }
    return `The store ${storeWithMaxQty} has ${maxQty} of "${productName}"`;
  })(this.stocks, this.productName);
}

const report = new Report(response);

console.log(report.productName);
console.log(report.storesWithProduct);
console.log(report.maxStock);
