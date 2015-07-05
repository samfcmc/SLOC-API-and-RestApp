function MenuManager() {

    var apiURl = "../slocAPI.php?";

    var get_endpoint_url = function(endpoint) {
      return apiURl + endpoint;
    }

    this.getCurrentMenu = function (listId, menuList) {
        var showMenuList = document.getElementById(listId);

        if (menuList.length !== 0) {
            for (var i in menuList) {
                var listElem = document.createElement("li");
                listElem.id = "li" + menuList[i].id;
                //listElem.className = "list-unstyled";
                listElem.textContent = menuList[i].name + " ------ " + menuList[i].price + "€";
                showMenuList.appendChild(listElem);
            }
        }
        else {
            var info = document.createElement("li");
            info.id = "info";
            //info.className = "list-unstyled";
            info.textContent = "No Elements in this Menu!";
            showMenuList.appendChild(info);
        }
    };

    this.setRemoveMenu = function (divId, menuList) {
        var removeMenuDiv = document.getElementById(divId);

        for (var i in menuList) {
            //var formGroup = document.createElement("div");
            //formGroup.className = "form-group";
            //formGroup.id = "form" + menuList[i].id;
            var colDiv = document.createElement("div");
            colDiv.className = "col-sm-offset-5";
            colDiv.id = "form" + menuList[i].id;
            var checkboxDiv = document.createElement("div");
            checkboxDiv.className = "checkbox";
            var newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";
            newCheckbox.value = menuList[i].id;
            newCheckbox.id = "checkbox" + menuList[i].id;
            newCheckbox.name = menuList.name;

            var newLabel = document.createElement("label");
            var newDescr = document.createTextNode(menuList[i].name + " ------ " + menuList[i].price + "€");
            newLabel.appendChild(newCheckbox);
            newLabel.appendChild(newDescr);
            checkboxDiv.appendChild(newLabel);
            colDiv.appendChild(checkboxDiv);
            //formGroup.appendChild(colDiv);
            removeMenuDiv.appendChild(colDiv);
        }
    };

    this.getNewElement = function () {
        var selecElem = document.getElementById("elementType");
        var type = selecElem.options[selecElem.selectedIndex].value;
        var name = document.getElementById("elementName").value;
        var price = document.getElementById("elementPrice").value;

        return [type, name, price];
    };

    this.addElementToServer = function (newElem) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var answer = JSON.parse(xmlhttp.responseText);
                console.log("menuManager - addElement answer: " + answer);
                if (answer === 1) {
                    alert("Element successfully added!");
                }
                else {
                    alert("Comunication erro!");
                }
            }
        };
        var url = get_endpoint_url("app=restApp&func=updateLocationData&path=menu/" + newElem[0] + "/data.dat&data=" + newElem[1] + ":" + newElem[2]);
        xmlhttp.open("POST", url, true);
        //xmlhttp.open("POST", "http://192.168.2.1/slocAPI.php?app=restApp&func=updateLocationData&path=menu/" + newElem[0] + "/data.dat&data=" + newElem[1] + ":" + newElem[2], true);
        xmlhttp.send();
    };

    this.removeFromServer = function (type, menuList) {
        var listToSend = [];
        var data;
        var func;
        if (menuList.length !== 0) {
            for (var i in menuList) {
                var line = menuList[i].name + ":" + menuList[i].price;
                listToSend.push(line);
            }
            data = JSON.stringify(listToSend);
            func = "setLocationData";
        }
        else {
            data = "";
            func = "deleteLocationData";
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var answer = JSON.parse(xmlhttp.responseText);
                console.log("menuManager - removeElement answer: " + answer);
                if (answer === 1) {
                    alert("Element successfully removed!");
                }
                else {
                    alert("Comunication erro!");
                }
            }
        };
        //console.log("http://localhost/sloc_server/slocAPI.php?app=restApp&func=" + func + "&path=menu/" + type + "&data=" + data);
        var url = get_endpoint_url("app=restApp&func=" + func + "&path=menu/" + type + "/data.dat&data=" + data);
        xmlhttp.open("POST", url, true);
        //xmlhttp.open("POST", "http://192.168.2.1/slocAPI.php?app=restApp&func=" + func + "&path=menu/" + type + "/data.dat&data=" + data, true);
        xmlhttp.send();
    };

    this.elementChecked = function (id) {
        // Check the options selected and create a string with the corresponding menu
        var elementCheck = [];
        var i = 1;

        while (i) {
            var checkboxSel = document.getElementById("checkbox" + id + (i - 1));
            if (checkboxSel instanceof HTMLInputElement
                    && checkboxSel.getAttribute("type") === "checkbox") {
                if (checkboxSel.checked) {
                    elementCheck.push(checkboxSel.value);
                }
            }
            else
                break;
            i++;
        }
        return elementCheck;

    };
}
