function MenuOptionSel() {

    // create a form of checkbox to select the shifts
    this.createOption = function (divId, data) {
        var optionMainDiv = document.getElementById(divId);
        for (var i in data) {
            //var formGroup = document.createElement("form");
            var optionDiv = document.createElement("div");
            var imgDiv = document.createElement("div");
            //formGroup.className = "form-inline";
            optionDiv.className = "form-group";

            //---- create image ----
            var newImg = document.createElement("img");
            newImg.src = "http://localhost/sloc_server/restApp/menu/" + data[i].type + "/images/"
                    + data[i].name + ".jpeg";
            newImg.alt = data[i].type + "image";
            newImg.width = "300";
            newImg.height = "200";

            //---- create label ----
            var newLabel1 = document.createElement("label");
            var newDescr1 = document.createTextNode(data[i].name + " ----- " + data[i].price
                    + "€ ");
            
            newLabel1.for = data[i].id;

            //---- create text input ----
            var newOption = document.createElement("input");
            //newOption.className = "form-control";
            newOption.id = data[i].id;
            newOption.type = "checkbox";
            //newOption.min = "0";
            //newOption.max = "50";
            newOption.name = data[i].name + "," + data[i].price;
            newOption.value = data[i].name + "," + data[i].price;
            imgDiv.appendChild(newImg);
            newLabel1.appendChild(newDescr1);
            newLabel1.appendChild(newOption);
            optionDiv.appendChild(newLabel1);
            //formGroup.appendChild(optionDiv);
            optionMainDiv.appendChild(imgDiv);
            optionMainDiv.appendChild(optionDiv);
            optionMainDiv.appendChild(document.createElement("br"));
            //---- create buttons ----
            //var optionIncBtn = document.createElement("button");
            //optionIncBtn.className = "btn btn-default";
            //optionIncBtn.value = "+";
            //optionIncBtn.onClick = function () {
            //    var inputText = document.getElementById(data[i].id);
            //    var valueInc = inputText.value;
            //    if (valueInc < 100) {
            //        inputText.value = valueInc + 1;
            //    }
            //};
            //formGroup.appendChild(optionIncBtn);


            //var optionDecBtn = document.createElement("button");
            //optionDecBtn.className = "btn btn-default";
            //optionDecBtn.value = "-";
            //optionDecBtn.click = function () {
            //    var inputText = document.getElementById(data[i].id);
            //    var valueDec = inputText.value;
            //    if (valueDec > 0) {
            //        inputText.value = valueDec - 1;
            //    }
            //};
            //formGroup.appendChild(optionDecBtn);


        }
    };

    this.menuChecked = function (type) {

        // Check the options selected and create a string with the corresponding menu
        var menuCheck = [];
        var i = 1;

        while (i) {
            var checkboxmenu = document.getElementById(type + (i - 1));
            if (checkboxmenu instanceof HTMLInputElement
                    && checkboxmenu.getAttribute("type") === "checkbox") {
                if (checkboxmenu.checked) {
                    console.log("checkbox - checked");
                    menuCheck.push(checkboxmenu.value);
                }
            }
            else
                break;
            i++;
        }
        return menuCheck;
    };
}
