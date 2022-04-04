function parseInputData(value) {
  var items = value.split('+');

  if (value.indexOf('+') === -1) {
    items = [value];
  }

  var total = 0;
  for (var i = 0; i < items.length; i++){
    item = items[i].trim();
    total += parseFloat(item);
  }

  return total;
}

function saveInput(name, value) {
  window.localStorage.setItem(name, value);
}

function fetch() {
  var carb = window.localStorage.getItem('carb');
  var protein = window.localStorage.getItem('protein');
  var fat = window.localStorage.getItem('fat');

  $('[name=carb]').val(carb);
  $('[name=protein]').val(protein);
  $('[name=fat]').val(fat);

  $(`#carbHelpInline`).html(parseInputData(carb));
  $(`#fatHelpInline`).html(parseInputData(fat));
  $(`#proteinHelpInline`).html(parseInputData(protein));
}

function mask(){
  
}

$(document).ready(function() {

    $('input').keyup(function() {
      
      var value = $(this).val();

      // sanitization
      value = value.replace(',', '.');
      value = value.replace(' ', '+');
      value = value.replace(/\+{2,}/, '+');
      value = value.trim();
      $(this).val(value);

      var name = $(this).attr('name');

      saveInput(name, value);

      var total = parseInputData(value);
      var target = $(this).data('target');

      $(`#${target}`).html(total);

    });

    fetch();

});
