async function subbook1() {
    const params = new URLSearchParams({
        target:'title',
        query:'바움 가트너'
        
    });

    try{
         const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    if (!response.ok){
        throw new Error(`HTTP 오류발생 오류코드:${response.status}`);
    }

    const data = await response.json();
    const box = $('.book-thumbnail');
    const book = data.documents[0];
    const date = new Date(book.datetime).toLocaleDateString('ko-KR');
    box.append(`<img src ="${book.thumbnail}" alt="${book.title}">`)
    $('.book-title h2').append(`${book.title}`)
    $('.book-ul li').first().append(`${book.authors}`)
    $('.book-ul li').eq(1).append(`${book.translators}`)
     $('.book-ul li').last().append(`${book.publisher}`)
     $('.date-time').append(`${date}`)
    $('.sale-price h2').append(`${book.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
    $('.sale-price del').append(`${book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'원'}`)
    $('.payment-thumbnail').append(`<img src="${book.thumbnail}" alt="${book.title}">`)
    $('.payment-thumbnail').append(`<h4>${book.title}</h4>`)
    } catch(error){
        console.error('오류발생:',error);
    }
}
subbook1();

async function subbook2() {
  const params = new URLSearchParams({
    target: 'title',
    query: '바움 가트너'
  });

  try {
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류발생 오류코드:${response.status}`);
    }

    const data = await response.json();
    const book = data.documents[0];
    const unitPrice = book.sale_price;

    // DOM 요소 선택
    const priceElement = document.querySelector('.button-price');
    const countInput = document.querySelector('.count');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');

    // 총 가격 업데이트 함수
    function updateTotal() {
      const quantity = parseInt(countInput.value);
      const total = unitPrice * quantity;
      priceElement.textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
    }

    // 수량 증가/감소 이벤트
    minusBtn.addEventListener('click', () => {
      let value = parseInt(countInput.value);
      if (value > 1) {
        countInput.value = value - 1;
        updateTotal();
      }
    });

    plusBtn.addEventListener('click', () => {
      let value = parseInt(countInput.value);
      countInput.value = value + 1;
      updateTotal();
    });

    updateTotal(); // 처음 로드 시 총액 계산

  } catch (error) {
    console.error('오류발생:', error);
  }
}

subbook2();




  $(document).ready(function () {
  function slide1() {
    $('.gong2').stop().animate({ marginTop: -40 }, 800, function () {
      $('.gong2 li:first').appendTo('.gong2');
      $('.gong2').css({ marginTop: 0 });
    });
  }
  setInterval(slide1, 3000);
});


$('.book-tab-box li').click(function(e){
    e.preventDefault();
    $('.book-tab-box li').removeClass('active');
    $(this).addClass('active');
    
})

async function subbook3() {
  const params = new URLSearchParams({
    target:'title',
    query:'바움 가트너'
  });
  
  try {
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류발생 오류코드:${response.status}`);
    }

    const data = await response.json();
    const book = data.documents[0];
    const unitPrice = book.sale_price;

    const minus = document.querySelector('.minus1');
    const plus = document.querySelector('.plus1');
    const countInput = document.querySelector('.count1');
    const priceElement = document.querySelector('.button-price1');

    // 🔁 총 가격 계산 함수
    function updateTotal() {
      const quantity = parseInt(countInput.value);
      const total = unitPrice * quantity;
      priceElement.textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
    }

    
    minus.addEventListener('click', () => {
      let value = parseInt(countInput.value);
      if (value > 1) {
        countInput.value = value - 1;
        updateTotal();
      }
    });

    plus.addEventListener('click', () => {
      let value = parseInt(countInput.value);
      countInput.value = value + 1;
      updateTotal();
    });

    updateTotal(); // 초기 계산

  } catch (error) {
    console.log('에러발생', error);
  }
}

subbook3();


async function subbook4() {
  const params = new URLSearchParams({
    target:'title',
    query:'바움 가트너',
  })
  try{
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });
    const data = await response.json();
    const book = data.documents[0];

    $('.isbn').append(`ISBN-13 : ${book.isbn}`);
    $('.publisher').append(`${book.publisher}`)
    $('.translators').append(`${book.translators}`)
    $('.status').append(`${book.status}`);
  }catch(error){
    console.log('에러발생','error');
  }
  
}
subbook4();



 document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    slidesPerGroup:2,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});


document.addEventListener('DOMContentLoaded',async function () {
  try{
    const response = await fetch("./sub.txt/sub.txt");
    if (!response.ok){
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    document.getElementsByClassName('book-txt')[0].innerHTML =data;
    $(document).ready(function() {
  $('.text-button').click(function(){
    $('.scroll-box').stop().slideDown();
    $('.text-button1').stop().show();
    $('.text-button').stop().hide();
    $('.gradient').css({'webkit-mask-image': 'none',
  'mask-image': 'none'});
  });
   $('.text-button1').click(function(){
    $('.scroll-box').stop().slideUp();
    $('.text-button').stop().show();
    $('.text-button1').stop().hide();
     $('.gradient').css({ 'webkit-mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)',
  'mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)'});
     });
});
  }catch (error){
    console.error("There was a problem with the fetch operation:, error");
  }
});

document.addEventListener('DOMContentLoaded',async function () {
  try{
    const response = await fetch("./sub.txt/sub1.txt");
    if (!response.ok){
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    document.getElementsByClassName('book-txt2')[0].innerHTML =data;
    $(document).ready(function() {
  $('.text-button2').click(function(){
    $('.scroll-box1').stop().slideDown();
    $('.text-button3').stop().show();
    $('.text-button2').stop().hide();
       $('.gradient2').css({'webkit-mask-image': 'none',
  'mask-image': 'none'});
  });
   $('.text-button3').click(function(){
    $('.scroll-box1').stop().slideUp();
    $('.text-button2').stop().show();
    $('.text-button3').stop().hide();
     $('.gradient2').css({ 'webkit-mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)',
  'mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)'});
     });
});
  }catch (error){
    console.error("There was a problem with the fetch operation:, error");
  }
});

document.addEventListener('DOMContentLoaded',async function () {
  try{
    const response = await fetch("./sub.txt/sub2.txt");
    if (!response.ok){
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    document.getElementsByClassName('book-txt3')[0].innerHTML =data;
    $(document).ready(function() {
  $('.text-button4').click(function(){
    $('.scroll-box2').stop().slideDown();
    $('.text-button5').stop().show();
    $('.text-button4').stop().hide();
    $('.gradient3').css({'webkit-mask-image': 'none',
  'mask-image': 'none'});
   
  });
   $('.text-button5').click(function(){
    $('.scroll-box2').stop().slideUp();
    $('.text-button4').stop().show();
    $('.text-button5').stop().hide();
    $('.gradient3').css({ 'webkit-mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)',
  'mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)'});
     });
});
  }catch (error){
    console.error("There was a problem with the fetch operation:, error");
  }
});

document.addEventListener('DOMContentLoaded',async function () {
  try{
    const response = await fetch("./sub.txt/sub3.txt");
    if (!response.ok){
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    document.getElementsByClassName('book-txt4')[0].innerHTML =data;
    $(document).ready(function() {
  $('.text-button6').click(function(){
    $('.scroll-box3').stop().slideDown();
    $('.text-button7').stop().show();
    $('.text-button6').stop().hide();
    $('.gradient4').css({'webkit-mask-image': 'none',
  'mask-image': 'none'});
   
  });
   $('.text-button7').click(function(){
    $('.scroll-box3').stop().slideUp();
    $('.text-button6').stop().show();
    $('.text-button7').stop().hide();
    $('.gradient4').css({ 'webkit-mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)',
  'mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)'});
     });
});
  }catch (error){
    console.error("There was a problem with the fetch operation:, error");
  }
});




new Swiper('.mySwiper1', {
  slidesPerView: 4,
  spaceBetween: 30,
  
  slidesPerGroup: 4,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

// async function subbook5() {

//   const boxes = $('.mySwiper1 .swiper-slide')
//   const booksearch =['닥터프렌즈의 구사일생','서랍에 저녁을 넣어 두었다','지구에서 한아뿐','너무나 많은 여름이','고리오 영감','체호프단편선','북회귀선/남회귀선','세뇌 살인'];

//   for (let i=0; i<booksearch.length; i++){
//     const query=booksearch[i];

//     const params = new URLSearchParams({
//       target:'title',
//       query:query
//     });

//     const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
//       method: 'GET',
//       headers: {
//         Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
//       }
//     });

//     const data = await response.json();
//     const book = data.documents[0];
    
//     if (book && boxes[i]){
//       const box = boxes.eq(i)

//       box.html("");
//        box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
//        box.append(`<h6>${book.title}</h6>`)
//        box.append(`<p>${book.authors} | ${book.publisher}</p>`)
//     }
//   } 


// }
//   subbook5();
