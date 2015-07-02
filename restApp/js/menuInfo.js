function MenuInfo(menuData) {
    this.menuData = menuData;
    this.mainCourse = [];
    this.desserts = [];
    this.drinks = [];
    this.points = [];

    this.setMenu = function () {

        for (var property in this.menuData) {
            if (property === "menu/maincourses") {
                if (this.menuData["menu/maincourses"]["data.dat"] !== undefined) {
                    var mainList = this.menuData["menu/maincourses"]["data.dat"];
                    //console.log(typeof mainList);
                    if (mainList.length > 0) {
                        mainList = mainList[0].split(";");
                        //console.log(mainList);
                        this.mainCourse = this.setList(mainList, "maincourses", "MC");
                    }
                }
            }
            else if (property === "menu/desserts") {
                //console.log("restApp - menuInfo.js dessertList: ", this.menuData["menu/desserts"]["data.dat"]);
                if (this.menuData["menu/desserts"]["data.dat"] !== undefined) {
                    var dessertList = this.menuData["menu/desserts"]["data.dat"];
                    if (dessertList.length > 0) {
                        dessertList = dessertList[0].split(";");
                        this.desserts = this.setList(dessertList, "desserts", "DE");
                    }
                }
            }
            else if (property === "menu/drinks") {
                if (this.menuData["menu/drinks"]["data.dat"] !== undefined) {
                    var drinkList = this.menuData["menu/drinks"]["data.dat"];
                    if (drinkList.length > 0) {
                        drinkList = drinkList[0].split(";");
                        this.drinks = this.setList(drinkList, "drinks", "DI");
                    }
                }
            }
            else if (property === "points") {
                this.points = this.menuData["points"];
            }
        }
    };

    this.setList = function (list, type, id) {
        var newList = [];
        //var menuList = list.split(";");
        //console.log(list);

        for (var i = 0; i < list.length; i++) {
            var menuLine = list[i].split(":");
            menu = new Object();
            menu.name = menuLine[0];
            menu.price = menuLine[1];
            menu.id = id + i;
            menu.type = type;
            newList.push(menu);
        }
        console.log(newList);
        return newList;
    };

    this.getMainCourse = function () {
        return this.mainCourse;
    };

    this.getDesserts = function () {
        return this.desserts;
    };

    this.getDrinks = function () {
        return this.drinks;
    };

    this.getPoints = function () {
        return this.points;
    };
}


