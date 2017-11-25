var arrItem = [];
var index;
tbody = document.querySelector(".tbody");
var formatter = new Intl.NumberFormat ("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

function showError (field, errorMessage, classError) {
  var str='.'+classError;
    if ( document.querySelector(str) === null ) {
      var errorSpan = document.createElement ("span");
      var errorMessage = document.createTextNode (errorMessage);
      errorSpan.appendChild( errorMessage );
      errorSpan.className = classError;

      var fieldLabel = document.getElementById(field).previousSibling;
        while (fieldLabel.nodeName.toLowerCase() !== "label") {
          fieldLabel = fieldLabel.previousSibling;
        }
      fieldLabel.appendChild(errorSpan);
      var fieldborder = document.getElementById(field);
      fieldborder.classList.add("border-error");
    };
}

function clearError ( classError, field ) {
  if(document.querySelector(classError) !== null) {
    document.querySelector(classError).remove();
    var fieldborder = document.getElementById (field);
    fieldborder.classList.remove ("border-error");
  };
}

function checkEmptyInput () {
    var isEmpty = false,
    name = document.querySelector(".name-field").value;
    count = document.querySelector(".count-field").value;
    price = document.querySelector(".price-field").value;
      if (name === "" || name.trim().length === 0 || name.length > 15) {
      showError('addname', 'Неверно заполнено поле!', 'name-error-message');
      isEmpty = true;
      }
      else { clearError('.name-error-message', 'addname'); };
      if(count === ""){
        showError('addcount', 'Неверно заполнено поле!','count-error-message');
        isEmpty = true;
      }
      else {
        clearError('.count-error-message', 'addcount');
      }
      if(price === "") {
        showError('addprice', 'Неверно заполнено поле!', 'price-error-message');
        isEmpty = true;
      }
      else {
        clearError('.price-error-message', 'addprice');
      };
    return isEmpty;
}

function checkPriceInput(input) {
    input.value = input.value.replace(/[^\d.]/g, '');
};

function buttonChangeValue() {
  var btn=document.querySelector('.btn-addform').value;
    if ( btn === "Add") { addHtmlTableRow(); }
    else { addEditHtmlTableRow(); }
};

function addEditHtmlTableRow() {
  if(!checkEmptyInput()){
    name = document.querySelector(".name-field").value;
    count = document.querySelector(".count-field").value;
    price = document.querySelector(".price-field").value;
      arrItem[index].name =name;
      arrItem[index].count =count;
      arrItem[index].price =price;
        tbody.rows[index].cells[0].innerHTML=name;
        tbody.rows[index].cells[1].innerHTML=count;
        tbody.rows[index].cells[2].innerHTML=formatter.format(price);
        index=0;
  }
};

function addHtmlTableRow () {
        if(!checkEmptyInput()) {
            var item = {};
            name = document.querySelector(".name-field").value;
            count = document.querySelector(".count-field").value;
            price = document.querySelector(".price-field").value;
            var newRow = tbody.insertRow(tbody.length);
            cellName=newRow.insertCell(0);
            cellName.className = "name-border-none name-text";
            cellName.innerHTML = name;
            cellCount=newRow.insertCell(1);
            cellCount.className = "count-border-none";
            cellCount.innerHTML = count;
            newRow.insertCell(2).innerHTML = formatter.format(price);
            newRow.insertCell(3).innerHTML = '<button class="btn btn-edit" onclick="editHtmlTbleSelectedRow(this)" >Edit</button> <button class="btn btn-delete" onclick="deleteHtmlTbleSelectedRow(this)">Delete</button>';
                item.name=name;
                item.count=count;
                item.price=price;
                arrItem[arrItem.length]=item;
        }
};

function resetButton() {
    document.getElementById("addname").value = "";
    document.getElementById("addcount").value = "";
    document.getElementById("addprice").value = "";
    document.querySelector('.btn-addform').value="Add";
};

function editHtmlTbleSelectedRow(e) {
    document.querySelector('.btn-addform').value = 'Update';
    var buttonEdit = document.querySelectorAll('.btn-edit');
    	for (i=0; i < buttonEdit.length; i++) {
            if (buttonEdit[i] == e) {
                document.querySelector(".name-field").value=arrItem[i].name;
                document.querySelector(".count-field").value=arrItem[i].count;
                document.querySelector(".price-field").value=arrItem[i].price;
                index=i;
            };
	    }
};

function deleteHtmlTbleSelectedRow(e) {
    if (confirm("Вы подтверждаете удаление?")) {
        var buttonDelete = document.querySelectorAll('.btn-delete');
            for (i=0; i < buttonDelete.length; i++) {
                if (buttonDelete[i] == e) {
                    arrItem.splice(i, 1);
                    tbody.deleteRow(i);
                };
            }
    }};

function sortArrayPrice() {
    var btnSort=document.querySelector(".btn-sort-price");
    if (btnSort.classList.contains("btn-sort-up") == true) {
        btnSort.classList.remove("btn-sort-up");
        btnSort.classList.add("btn-sort-down");
        arrItem.sort(function (a, b) {
            if (parseInt(a.price) < parseInt(b.price)) return 1;
            if (parseInt(a.price) > parseInt(b.price)) return -1;
        });
        for (var i = 0; i < arrItem.length; i++) {
            tbody.rows[i].cells[0].innerHTML=arrItem[i].name;
            tbody.rows[i].cells[1].innerHTML=arrItem[i].count;
            tbody.rows[i].cells[2].innerHTML=formatter.format(arrItem[i].price);
        };
    }
    else {
        btnSort.classList.remove("btn-sort-down");
        btnSort.classList.add("btn-sort-up");
            arrItem.sort(function (a, b) {
                if (parseInt(a.price) > parseInt(b.price)) return 1;
                if (parseInt(a.price) < parseInt(b.price)) return -1;
            });
                for (var i = 0; i < arrItem.length; i++) {
                    tbody.rows[i].cells[0].innerHTML=arrItem[i].name;
                    tbody.rows[i].cells[1].innerHTML=arrItem[i].count;
                    tbody.rows[i].cells[2].innerHTML=formatter.format(arrItem[i].price);
                    };
    }
}

function sortArrayName() {
    if (tbody.innerHTML !== ""){
        var btnSort=document.querySelector(".btn-sort-name");
                if (btnSort.classList.contains("btn-sort-up") == true) {
                    btnSort.classList.remove("btn-sort-up");
                    btnSort.classList.add("btn-sort-down");
                    arrItem.sort(function (a, b) {
                        if (a.name < b.name) return 1;
                        if (a.name > b.name) return -1;
                    });
    for (var i = 0; i < arrItem.length; i++) {
        tbody.rows[i].cells[0].innerHTML=arrItem[i].name;
        tbody.rows[i].cells[1].innerHTML=arrItem[i].count;
        tbody.rows[i].cells[2].innerHTML=formatter.format(arrItem[i].price);
    };
}
    else {
      btnSort.classList.remove("btn-sort-down");
      btnSort.classList.add("btn-sort-up");
      arrItem.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
      for (var i = 0; i < arrItem.length; i++) {
        tbody.rows[i].cells[0].innerHTML=arrItem[i].name;
        tbody.rows[i].cells[1].innerHTML=arrItem[i].count;
        tbody.rows[i].cells[2].innerHTML=formatter.format(arrItem[i].price);
      };}
}
}

function filtrByName1() {
    if (tbody.innerHTML !== ""){
    var field=document.querySelector(".search-field");
        function filterByName(obj) {
            var str = field.value.toLowerCase();
            console.log(str);
            if ( obj.name.toLowerCase().match(str)) {return true;}
                else {  return false;}
        };
        var arrByName =arrItem.filter(filterByName);
console.log(arrByName);
        tbody.innerHTML="";
        for (var i = 0; i < arrByName.length; i++) {
               var newRow = tbody.insertRow(tbody.length);
               cellName=newRow.insertCell(0);
               cellName.innerHTML=arrByName[i].name;
               cellName.className = "name-border-none name-text";
                cellCount=newRow.insertCell(1);
                cellCount.innerHTML=arrByName[i].count;
                cellCount.className = "count-border-none";
                newRow.insertCell(2).innerHTML= formatter.format(arrByName[i].price);
                newRow.insertCell(3).innerHTML = '<button class="btn btn-edit" onclick="editHtmlTbleSelectedRow(this)" >Edit</button> <button class="btn btn-delete" onclick="deleteHtmlTbleSelectedRow(this)">Delete</button>';
            };
}}
