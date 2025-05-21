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


