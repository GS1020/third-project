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



async function bookData() {
  const params = new URLSearchParams({
    target: 'title',
    query: '나혼자만 레벨업',
    size: 1

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
      const box = $('.bigbook');
      const ten = book.contents.substring(0, 160);
      box.append("<img src=" + book.thumbnail + ">")
      box.append(`<h5>${book.title}</h5>`)
      box.append(`<h6>${book.authors}</h6>`)
      box.append(`<p>${ten}</p>`)

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

const swiper1 = new Swiper('.mySwiper1', {
  slidesPerView: 3,

  loop: true,
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: '.mySwiper1 .swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.mySwiper1-button-next',
    prevEl: '.mySwiper1-button-prev',
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
function upDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  document.getElementsByClassName('todaydate')[0].innerHTML = `${year}년 ${month}월 ${date}일`;
}
upDate();


// 오늘의 책
async function bookData4() {
  const boxes = $('.todaybox');
  const booksearch = ['바움가트너', '과자 사면 과학 드립니다', '닥터프렌즈의 구사일생', '인구 충격 부동산', '귀하신 몸'];

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
      box.append(`<h6>${book.authors}</h6>`);

      box.css('position', 'relative');
      const ten = book.contents.substring(0, 190);
        if (book.title.includes('바움가트너')) {
    box.on('click', function () {
      window.location.href = 'sub.html';
    });
  }

      box.append(`<div class="overlay"
        style="background-color:#333;width:100%;height:100%;opacity:0.9;color:#fff; position:absolute; padding:20px;top:0;left:0;overflow:auto; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)
      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px;"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
  
`);
      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });
    }

  }
}
bookData4();

$(document).ready(function () {
  function slide1() {
    $('.gong2').stop().animate({ marginTop: -40 }, 800, function () {
      $('.gong2 li:first').appendTo('.gong2');
      $('.gong2').css({ marginTop: 0 });
    });
  }
  setInterval(slide1, 3000);
});


var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 10,
  effect: "coverflow",
  coverflowEffect: {
    slideShadows: false,
  },
  pagination: {
    el: ".mySwiper2 .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});


async function bookData5(category='종합') {
  const categoryBooks = {
    '종합': ['흔한남매', '결국 국민이 합니다', '모순', '급류', '대한민국헌법', '청춘의 독서', '소년이 온다', '쇼펜하우어 인생수업', '파과', '단 한 번의 삶'],
    '국내소설':['모순', '급류', '소년이 온다'],
    '외국소설':['파과', '단 한 번의 삶', '테일러'],
    '비소설':['결국 국민이 합니다', '대한민국헌법', '청춘의 독서', '쇼펜하우어 인생수업'],
    '경제경영':['말투만 바꿨을 뿐인데','듀얼 브레인','데일 카네기'],
    '인문과학':['청춘의 독서','쇼펜하우어 인생수업','초역 부처의말'],
    '어린이': ['흔한남매','레고 마인크래프트','백앤아 9'],
    '외국어': ['해커스 토익 기출','ETS 토익','해커스 일본어'],
    '자기계발':['말투만 바꿨을 뿐인데','듀얼 브레인','데일 카네기'],
    '만화': ['티니핑', '사카모토 데이즈', '나 혼자만 레벨업'],
    '유아':['슈팅스타 캐치','건전지 할머니','아롱다롱'],
    '가정/생활/요리':['임신 출산 육아','뿐이 토핑 이유식','삐뽀삐뽀 119 이유식'],
    '청소년':['죽이고 싶은 아이','죽이고 싶은 아이2','여름을 한 입 베어물었더니']
  }
  const boxes = $('.mySwiper2 .swiper-slide');
  const booksearch = categoryBooks[category] || [];

  for (let i=0; i<boxes.length;i++){
      const box = boxes.eq(i);
      box.html("");
  }

  for (let i=0; i<booksearch.length;i++){
    const query=booksearch[i];

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
    const book =data.documents[0];

    if(book && boxes[i]){
      const ten = book.contents.substring(0,150);
      const box = $(boxes[i]);

      box.html("");

      box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      box.append(`<div class="textbox">
        <h5>${book.title}</h5>
        <h6>${book.authors.join(', ')}</h6>
        <p>${ten}</p>
      </div>`);
    }
  }

}
bookData5();

$('.besthead-li li').click(function(){
  $('.besthead-li li').removeClass('besthead-lii');
  $(this).addClass('besthead-lii');

  const category = $(this).text().trim()
  bookData5(category);
});
  $(document).ready(function(){
    bookData5('종합');
  });



// 화제의 책들 스와이퍼

var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 5,
  slidesPerGroup: 5,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".mySwiper3-pagination",
    clickable: true,
  },
});


async function bookData6(category='소설/에세이/시') {
  const categoryBooks = {
    '소설/에세이/시':['디 에센셜 김연수','슬픔도 기쁨도 왜 이리 찬란한가','페른베','절망의 구','꿀잠'],
    '자녀교육/건강/여행/요리':['동공이 약사의','부케북 Happy','코바늘로','제주 걷기 여행','수면의 뇌과학'],
    '유아/어린이/초등학습':['그물에 걸린 무지개','치코','아홉 살 환경','설민석의 한국사','퍄퍄킴'],
    '중/고학습':['EBS 수능완성','수학의 힘','쎈 중등 수학','유형 + 내신','메가스터디'],
    '인문/역사':['친밀한 파괴자','화장실을 부탁해','생각대로 살지','초압축 교양수업','어제보다 조금'],
    '외국어':['3초 5단어','아니마칸지의','카와이 일본어','디즈니 픽사 베스트','영어 하기 딱 좋은'],
    '예술':['오아시스 더 마스터플랜','살롱 드 경성','joy','꽃이 피는 루하의','동글동글 귀여운'],
    '컴퓨터/IT':['주니어 백엔드','시나공 빅데이터분석기사','모두의 딥러닝','요즘 교사를 위한','머신러닝'],
    '기술/공학':['탈주택 - 공동체를 설계하는 건축']
    
  }
  const boxes = $('.mySwiper3 .swiper-slide');
  const booksearch = categoryBooks[category] || [];

  for (let i=0; i<boxes.length;i++){
      const box = boxes.eq(i);
      box.html("");
  }

  for (let i=0; i<booksearch.length;i++){
    const query=booksearch[i];

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
    const book =data.documents[0];

    if(book && boxes[i]){
      
      const box = $(boxes[i]);

      box.html("");

      box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      box.append(`<div class="textbox">
        <h5>${book.title}</h5>
        <p>${book.authors}</p>

      </div>`);

      box.css('position', 'relative');
      const ten = book.contents.substring(0, 160);
      box.append(`<div class="overlay"
        style="background-color:#333;width:100%;height:273px;opacity:0.9;color:#fff; position:absolute; padding:20px;top:0;left:0;overflow:hidden; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)
      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px;padding:10px;"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
`);
      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });
    }
  }

}
bookData6();



$('.hothead-li li').click(function () {
  $('.hothead-li li').removeClass('hot-lii');
  $(this).addClass('hot-lii');

    const category = $(this).text().trim()
  bookData6(category);
})
$(document).ready(function(){
    bookData6('소설/에세이/시');
  });






async function bookData7() {
  const boxes = $('.recent-bookbox');
  const booksearch = [
    '내 꿈에 가끔만 놀러와', '김켈리의 신비마트3', '완벽주의자의 조용한 우울', '모든 것이 양자 이론', '고음질 명반 가이드북'
  ];

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
      box.css('position', 'relative');
      box.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      box.append(`<div class="textbox">
          <h5>${book.title}</h5>
          <h6>${book.authors}</h6>
          
          </div>
        `);
      const ten = book.contents.substring(0, 190);
      box.append(`<div class="overlay"
        style="background-color:#333;width:100%;height:100%;opacity:0.9;color:#fff; position:absolute; padding:20px;top:0;left:0; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)
      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px;"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
`);
      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });

    }

  }
}
bookData7();


// 급상승 도서 스와이프
var swiper4 = new Swiper(".mySwiper4", {
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 5,
  freeMode: true,
  pagination: {
    el: ".mySwiper4-pagination",
    clickable: true,
  },
});


async function bookData8() {
  const boxes = $('.mySwiper4 .swiper-slide');
  const booksearch = [
    '청춘의 독서', '빛과 실', '어른 김장하 각본', '흔한남매 19', '시간 유전자', '너였구나', '똥볶이 할멈', '돈과 시간을 장악', '채식주의자', '작별하지 않는다', '긴긴밤', '별에게', '별별 직업 상담소', '마음의 기술', '초등일타과학'
  ];

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
      box.append(`<div class="upbox">
          <h5>${book.title}</h5>
          <h6>${book.authors}</h6>
          
          </div>
        `);
      const ten = book.contents.substring(0, 160);
      box.append(`<div class="overlay"
        style="background-color:#333;width:188px;height:273px;opacity:0.9;color:#fff; position:absolute; padding:20px; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)
      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px; padding:10px;"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
`);
      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });

    }

  }
}
bookData8();
// hotbook 슬라이드
var swiper5 = new Swiper(".mySwiper5", {
  slidesPerView: 1,
  spaceBetween: 10,
  slidesPerGroup: 5,
  pagination: {
    el: ".mySwiper5-pagination",
    clickable: true,
  },
  // freeMode: false,
  // loop:false,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

//hot book 슬라이더

async function bookData9() {
  const boxes = $('.mySwiper5 .swiper-slide');
  const booksearch = [
    '엄마 당신의 이야기를 들려주세요', '아빠 당신의 이야기를 들려주세요', '더 퀸-', '나민애의 동시 읽기', '단 한 번의 삶', '니체 인생수업(리커버 에디션)', '슈뻘맨 무인 편의점', '슈팅스타 캐치 티니핑', '빛과 실- 2024', '청춘의 독서'
  ];

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
      box.append(`<div class="hotbookbox">
          <h5>${book.title}</h5>
          <h6>${book.authors}</h6>
          </div>`

      );
      const ten = book.contents.substring(0, 160);
      box.append(`<div class="overlay"
        style="background-color:#333;width:188px;height:273px;opacity:0.9;color:#fff; position:absolute; padding:20px; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)

      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px; padding:10px"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
`);



      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });

    }

  }
}
bookData9();

// 이런책은 어떠세요 슬라이더

var swiper6 = new Swiper('.mySwiper6', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  direction: getDirection(),
  navigation: {
    nextEl: '.mySwiper6-button-next',
    prevEl: '.mySwiper6-button-prev',
  },
  on: {
    resize: function () {
      swiper6.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}


// 이런책은 어떠세요 슬라이더
async function bookData10() {
  const boxes = $('.mySwiper6 .swiper-slide');
  const queryList = ['트럼프', 'AI 시대', '노벨문학상', '둘리', '교황', '바르가스', '계절들'];

  for (let i = 0; i < queryList.length; i++) {
    const params = new URLSearchParams({
      target: 'title',
      query: queryList[i],
      size: 4
    });

    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
      method: 'GET',
      headers: {
        Authorization: "KakaoAK bd7cb41ce43d371ae2e745f1c7ba9962"
      }
    });

    const data = await response.json();

    if (boxes[i]) {

      const $box = $(boxes[i]);
      const $imgbox = $('<div class="imgbox" style="width:600px; height:210px"></div>');
      $box.append($imgbox);


      for (let j = 0; j < data.documents.length; j++) {
        const book = data.documents[j];
        $imgbox.append(`<img src="${book.thumbnail}" alt="${book.title}">`);
      }
    }
  }
}

bookData10();
// 할인 슬라이드
var swiper7 = new Swiper(".mySwiper7", {
  slidesPerView: 1,
  spaceBetween: 10,
  slidesPerGroup: 5,
  pagination: {
    el: ".mySwiper7-pagination",
    clickable: true,
  },
  // freeMode: false,
  // loop:false,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});


// 할인 슬라이드
async function bookData11() {
  const boxes = $('.mySwiper7 .swiper-slide');
  const booksearch = [
    '지능의 역사: 인류의 기원', '초판본 데미안', '어제와 똑같은 내가 싫어서', '안나 카레니나 1', '1만명 리더의 고민',
    '어린 왕자(1943년)', '365 괴테 일력', '카라마조프가의 형제들', '오페라의 유령(더클래식)', '나의 MBTI가 궁금하단 마리몽'
  ];

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
      box.append(`<div class="salebookbox">
          <h5>${book.title}</h5>
          <h6>${book.authors}</h6>
          
          </div>`);

      box.append(`<div class='saleprice'>
          <h7>${book.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</h7>
          <p><del>${book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</del></p>
      </div>`)
      const ten = book.contents.substring(0, 160);
      box.append(`<div class="overlay"
        style="background-color:#333;width:192px;height:282px;opacity:0.9;color:#fff; position:absolute; padding:20px; display:none"></div>`);
      box.find('.overlay').append(`<p>${ten}</p>`)

      box.find('.overlay').append(`<div class="overlaybox" style="display: flex; justify-content: space-around; gap: 10px; margin-top: 10px; padding:10px"></div>`);


      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">View</p>
  </div>
`);

      box.find('.overlaybox').append(`
  <div class="view" style="width:40px; height:40px; color:#fff; border:2px solid #fff; line-height:35px; text-align:center;">
    <p style="margin:0;">Cart</p>
  </div>
`);



      box.mouseenter(function () {
        $(this).children('.overlay').stop().fadeIn();
      }).mouseleave(function () {
        $(this).children('.overlay').stop().fadeOut();
      });

    }

  }
}
bookData11();  



$(document).ready(function () {
 
  $('.kbook-ul').show();
  $('.kbook-ul2, .kbook-ul3').hide();
  $('.nav-bigsize').hide();


  $('.kbook-category li').mouseenter(function () {
    let i = $(this).index();
    $('.kbook-ul, .kbook-ul2, .kbook-ul3').hide();

    if (i === 0) {
      $('.kbook-ul').show();
    } else if (i === 1) {
      $('.kbook-ul2').show();
    } else if (i === 2) {
      $('.kbook-ul3').show();
    }
  });

 
  let hideTimer;

  $('.nav3, .nav-bigsize').on('mouseenter', function () {
    clearTimeout(hideTimer);
    $('.nav-bigsize').stop(true, true).fadeIn(200).css('display', 'flex');
  });

  $('.nav3, .nav-bigsize').on('mouseleave', function () {
    hideTimer = setTimeout(function () {
      $('.nav-bigsize').stop(true, true).fadeOut(200);
    }, 300);
  });
});


