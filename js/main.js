async function bookData1() {
  const params = new URLSearchParams({
    target: 'title',
    query: "아빠 당신의 이야기를 들려주세요",

  });

  try {
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류 오류코드: ${response.status}`);
    }

    const data = await response.json();

    if (data.documents.length === 0) {
      $('.searchbook-container').append('<p>책 정보를 찾을 수 없습니다.</p>');
      return;
    }

    const book = data.documents[0];
    const summary = book.contents.substring(0, 60);


    const html = `
        <div class="searchbook">
          <img src="${book.thumbnail}" alt="책 썸네일">
          <div class="text-area">
            <p>${book.title}</p>
            <h6>${summary}</h6>
            <h5> < > </h5>
          </div>
        </div>
      `;

    $('.searchbook-container').append(html);

  } catch (error) {
    console.error('오류발생:', error);
    $('.searchbook-container').append('<p>데이터 로드 중 오류 발생</p>');
  }
}

bookData1();

$(document).ready(function () {
  let hideTimer;

  $('.nav3, .sub').on('mouseenter', function () {
    clearTimeout(hideTimer);
    $('.sub').stop(true, true).css('display', 'flex').fadeIn(200);
  });

  $('.nav3, .sub').on('mouseleave', function () {
    hideTimer = setTimeout(function () {
      $('.sub').stop(true, true).fadeOut(200);
    }, 300);
  });
});


$(document).ready(function () {
  const boxes = ['.kkbook2', '.kkbook3', '.kkbook4'];

  $('.kkbook li').mouseenter(function () {
    const index = $(this).index();


    boxes.forEach(box => $(box).stop().hide());


    if (boxes[index]) {
      $(boxes[index]).stop().css('display', 'flex').fadeIn();
    }
  });
});

async function bookData() {
  const params = new URLSearchParams({
    target: 'title',
    query: '테일러',
    size: 4

  });

  try {
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });


    if (!response.ok) {
      throw new Error(`HTTP 오류 오류코드: ${response.status}`);
    }

    const data = await response.json();

    if (data.documents.length === 0) {
      $('.searchbook-container').append('<p>책 정보를 찾을 수 없습니다.</p>');
      return;
    }



    for (let i = 0; i < data.documents.length; i++) {
      const book = data.documents[i];

      $('.bigbook').append("<img src=" + book.thumbnail + ">")
    }
  } catch (error) {
    console.error('오류발생:', error);
    $('.searchbook-container').append('<p>데이터 로드 중 오류 발생</p>');
  }
}
bookData();


// 스와이프
let appendNumber = 600;
let prependNumber = 1;
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});


// 섹션 베스트셀러

async function bookData3() {
  const boxes = $('.shortsbox');
  const booksearch = ['니체', '단 한번의 삶'];

  for (let i = 0; i < booksearch.length; i++) {
    const query = booksearch[i];

    const params = new URLSearchParams({
      target: 'title',
      query: query
    });

    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    const data = await response.json();
    const book = data.documents[0];

    if (book && boxes[i]) {
      const box = boxes.eq(i);
      box.html(""); // 혹시 중복 append 방지용 초기화
      box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      box.append(`<p>BEST SELLER</p>`)
      box.append(`<h6>${book.title}</h6>`);
      
      
    }
  }
}
bookData3();


  // 날짜 자동으로 갱신
  function upDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();

    document.getElementsByClassName('todaydate')[0].innerHTML=`${year}년 ${month}월 ${date}일`;
  }
  upDate();


// 오늘의 책
async function bookData4() {
  const boxes = $('.todaybox');
  const booksearch = ['바움가트너', '과자 사면 과학 드립니다','닥터프렌즈의 구사일생','인구 충격 부동산','귀하신 몸'];

  for (let i = 0; i < booksearch.length; i++) {
    const query = booksearch[i];

    const params = new URLSearchParams({
      target: 'title',
      query: query
    });

    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    const data = await response.json();
    const book = data.documents[0];
    
    if (book && boxes[i]) {
      const box = boxes.eq(i);
      box.html(""); 
      box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      box.append(`<h5>${book.title}</h5>`);
      box.append(`<h6>${book.authors}</6>`);

      
      }

  }
}
bookData4();