const tableName = document.querySelector('#name');
const tableMaterial = document.querySelector('#material');
const tableSize = document.querySelector('#size');
const tablePrice = document.querySelector('#price');
const tableBody = document.querySelector('#table-body');

let productList = [];

const addTableElement = (obj) => {
  tableBody.innerHTML += `<div class="table-el">
    <div class="table-name"><p>${obj.name}</p></div>
    <div class="table-material"><p>${obj.material}</p></div>
    <div class="table-size"><p>${obj.size}</p></div>
    <div class="table-price"><p>${obj.price} ₽</p></div>
    <button class="table-btn"><p>В корзину</p></button>
  </div>`;
};

fetch('https://63267beaba4a9c475326fd42.mockapi.io/api/dbases/test-files')
  .then((res) => res.json())
  .then((arr) => (productList = arr))
  .then(() => productList.map((el) => addTableElement(el)));

$('html').on('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  $('h5').text('Drag here');
});

$('html').on('drop', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

$(function () {
  $('html').on('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('h1').text('Drag here');
  });

  $('html').on('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $('.upload-area').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('h1').text('Drop');
  });

  $('.upload-area').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('h1').text('Drop');
  });

  // Drop
  $('.upload-area').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    $('h1').text('Upload');

    var file = e.originalEvent.dataTransfer.files;
    var fd = new FormData();

    fd.append('file', file[0]);

    uploadData(fd);
  });

  $('#uploadfile').click(function () {
    $('#file').click();
  });

  $('#file').change(function () {
    var fd = new FormData();

    var files = $('#file')[0].files[0];

    fd.append('file', files);

    uploadData(fd);
  });
});

function addThumbnail(data) {
  $('#uploadfile h1').remove();
  var len = $('#uploadfile div.thumbnail').length;

  var num = Number(len);
  num = num + 1;

  var name = data.name;
  var size = convertSize(data.size);
  var src = data.src;

  $('#uploadfile').append(
    '<div id="thumbnail_' + num + '" class="thumbnail"></div>'
  );
  $('#thumbnail_' + num).append(
    '<img src="' + src + '" width="100%" height="78%">'
  );
  $('#thumbnail_' + num).append('<span class="size">' + size + '<span>');
}

function convertSize(size) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (size == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
  return Math.round(size / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// Спрятать/Показать пароль
$(document).ready(function () {
  $('.password').on('click', '#eye', function () {
    var input = $('#password');
    if (input.attr('type') === 'password') {
      $(this).attr('src', '../img/eye-off.svg');
      input.attr('type', 'text');
    } else {
      $(this).attr('src', '../img/eye-on.svg');
      input.attr('type', 'password');
    }
  });
});

var x, i, j, l, ll, selElmnt, a, b, c;
// ищет все элементы с классом "custom-select"
x = document.getElementsByClassName('custom-select');
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  // для каждого элемента создает новый div который будет работать как выбранный элемент
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  // для каждого элемента создает новый div который будет содержать лист опций
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < ll; j++) {
    // для каждой опции из настоящего селекта создает div который работает как элемент опции
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      // обновить текущий select по нажатию на опцию
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    // закрыть все опции кроме выбранного и открыть/закрыть select
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}
function closeAllSelect(elmnt) {
  // закрыть все опции включая выбранный
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
// закрыть все опции, если пользователь кликнет вне элемента
document.addEventListener('click', closeAllSelect);

//(xxx) xxx-xxxx format code
$(document).ready(function () {
  $('#phone').on('input', function () {
    $('#phone').mask('+7 999 999-99-99');
    if ($('#phone').val().length < 16) {
      $('#phone').css({
        border: '1px solid #DC3545',
        backgroundImage: 'url("./img/x-close.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '50%',
        backgroundPositionX: '95%',
      });
    } else if ($('#phone').val().length === 16) {
      $('#phone').css({
        border: '1px solid #E1E1E1',
        backgroundImage: 'url("./img/check.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '50%',
        backgroundPositionX: '95%',
      });
    }
  });
});

$(document).ready(function () {
  $('#input-num').val('20000000 ₽');
  $('#input-num').change(function () {
    var chVal = $(this).val();
    if (chVal == 0) $(this).val('20000000' + ' ₽');
    else $(this).val(chVal + ' ₽');
  });
});

$(document).ready(function () {
  $('#email').on('input', function () {
    var value = $(this).val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(value)) {
      $('#email').css({
        border: '1px solid #DC3545',
        backgroundImage: 'url("./img/x-close.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '50%',
        backgroundPositionX: '95%',
      });
    } else if (regex.test(value)) {
      $('#email').css({
        border: '1px solid #E1E1E1',
        backgroundImage: 'url("./img/check.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '50%',
        backgroundPositionX: '95%',
      });
    }
  });
});

$(document).ready(function () {
  $('#furnish').on('click', function () {
    $('#furnish-txt').text(function () {
      if ($('#furnish-txt').text() == 'Вайтбокс') {
        return 'Нет';
      } else if ($('#furnish-txt').text() == 'Нет') {
        return 'Вайтбокс';
      }
    });
  });
});

$(document).ready(function () {
  $('.photos-block').hover(function () {
    $('.slideBtn').css('opacity', '1');
  });
  $('.photos-block').mouseleave(function () {
    $('.slideBtn').css('opacity', '0');
  });
});

// // ======================================?
// $(document).ready(function () {
//   $('#slideLeft').click(function () {
//     $('.photos-block').animate(
//       {
//         left: '100%',
//       },
//       1000
//     );
//   });
// });

$(document).ready(function () {
  $('#input-range').on('input', function () {
    var value = $('#input-range').val();
    $('#input-num').val(value + ' ₽');
  });
});

$(document).ready(function () {
  $('#plusBtn').click(function () {
    var value = $('#square-input').val().slice(0, -2);
    var num = Number(value) + 50;
    $('#square-input').val(`${num} м²`);
  });
  $('#minusBtn').click(function () {
    if ($('#square-input').val() !== '0 м²') {
      var value = $('#square-input').val().slice(0, -2);
      var num = Number(value) - 50;
      $('#square-input').val(`${num} м²`);
    }
  });
});
