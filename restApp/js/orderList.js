function OrderList() {
    this.order = 0;
    this.total = 0;

    this.chosenMenu = function (menuList, menuSelect) {
        for (var j in menuSelect) {
            if (menuList === menuSelect[j][0]) {
                return true;
            }
        }
        return false;
    };

    this.setOrderList = function (menuSel, tableId) {
        var menuTable = document.getElementById(tableId);
        console.log(menuSel);
        if (menuSel.length > 0) {
            for (var i in menuSel) {
                var menu = menuSel[i].split(",");
                var tableRow = document.createElement("tr");
                tableRow.align = "center";
                var tChoice = document.createElement("td");
                //var tQuant = document.createElement("td");
                var tPrice = document.createElement("td");

                //var quant = parseInt(menu[2]);
                var price = menu[1];
                tChoice.textContent = " - " + menu[0];
                //tQuant.textContent = "quantity: " + quant;
                tPrice.textContent = "price: " + price + "€";
                this.total = this.total + parseInt(price);
                if (this.order === 0) {
                    this.order = menu[0] + ":" + price;
                } else {
                    this.order = this.order + "_" + menu[0] + ":" + price;
                }
                tableRow.appendChild(tChoice);
                //tableRow.appendChild(tQuant);
                tableRow.appendChild(tPrice);
                menuTable.appendChild(tableRow);
            }
        }
    };

    this.setTotalToZero = function () {
        this.total = 0;
    };

    this.getTotal = function () {
        return this.total;
    };

    this.setOrderToZero = function () {
        this.order = 0;
    };

    this.makeOrder = function (userId, table, seat) {
        
        if (this.total !== 0) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var answer = JSON.parse(xmlhttp.responseText);
                    console.log(answer);
                    if (answer === 1) {
                        alert("Your order has been successfully delivered!");
                    }
                    else
                        alert("Comunication erro!");
                }
            };
            //console.log("POST", "http://localhost/locDev_server/slocAPI.php?app=restApp&func=updateLocationData&path=orders/data.dat&data=" +
            //        userId + "," + table + "," + seat + "," + this.total + "," + this.order);
            xmlhttp.open("POST", "http://localhost/sloc_server/slocAPI.php?app=restApp&func=updateLocationData&path=orders/data.dat&data=" +
                    userId + "," + table + "," + seat + "," + this.total + "," + this.order, true);
            //xmlhttp.open("POST", "http://192.168.2.1/slocAPI.php?app=restApp&func=updateLocationData&path=orders/data.dat&data=" +
            //        userId + "," + table + "," + seat + "," + this.total + "," + this.order, true);
            xmlhttp.send();
        } else
            alert("You have to choose at least an option to send an order!");
    };
}