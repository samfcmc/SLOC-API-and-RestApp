function OrderManager() {
    this.orderL = [];
    this.showOrder = [];

    this.showOrderList = function () {
        var orderTable = document.getElementById("tableOrder");
        orderTable.innerHTML = "";
        console.log("orderMAnager - showOrder: ", this.orderL);
        if (this.orderL.length > 0) {
            for (var i in this.orderL) {
                var tableRow = document.createElement("tr");
                tableRow.align = "center";
                tableRow.id = "R" + i;
                var tUser = document.createElement("td");
                var tTable = document.createElement("td");
                var tSeat = document.createElement("td");
                var tShow = document.createElement("td");
                
                tUser.textContent = "User - " + this.orderL[i].user;
                tTable.textContent = "Table - " + this.orderL[i].table;
                tSeat.textContent = "Seat - " + this.orderL[i].seat;

                var showBtn = document.createElement('input');
                showBtn.type = "button";
                showBtn.id = "B" + i;
                showBtn.name = this.orderL[i].status;
                if (this.orderL[i].status === "attend") {
                    showBtn.className = "btn btn-warning";
                } else {
                    showBtn.className = "btn btn-default";
                }
                showBtn.value = "Show Order";

                showBtn.onclick = orderView;

                tShow.appendChild(showBtn);

                tableRow.appendChild(tUser);
                tableRow.appendChild(tTable);
                tableRow.appendChild(tSeat);
                tableRow.appendChild(tShow);
                orderTable.appendChild(tableRow);
            }
        }
    };

    this.getOrderList = function () {
        return this.orderL;
    };

    this.setOrderListToZero = function () {
        this.orderL = [];
    };

    this.setOrderList = function (orderList) {
        orderList = orderList.split(";");
        for (var i in orderList) {
            var line = orderList[i].split(",");
            order = new Object();
            order.status = "not done";
            order.user = line[0];
            order.table = line[1];
            order.seat = line[2];
            order.total = line[3];
            order.order = line[4];
            this.orderL.push(order);
        }
    };

    this.setOrderStatus = function (id, status) {
        this.orderL[id].status = status;
    };

    this.removeDoneOrder = function () {
        var toRemove = this.orderL;
        var i = 0;
        var size = toRemove.length;
        console.log("removeDoneOrder - Before remove: ", toRemove);
        while (i < size) {
            if (toRemove[i].status === "done") {
                toRemove.splice(i, 1);
                size = toRemove.length;
            } else
                i++;
        }
        console.log("removeDoneOrder - After remove: ", toRemove);
        this.orderL = toRemove;
    };
}