async function bookData1() {
    const params = new URLSearchParams({
      target: 'title',
      query:"아빠 당신의 이야기를 들려주세요"
      
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

  // $(document).ready(function(){
  //   $('.kkbook li:first').mouseenter(function(){
  //     $('.kkbook2').stop().fadeIn();
  //     $('.kkbook3').stop().hide();
  //     $('.kkbook4').stop().hide()
  //   })
  //   $('.kkbook li:nth-child(2)').mouseenter(function(){
  //     $('.kkbook3').stop().css('display','flex').fadeIn();
  //     $('.kkbook2').stop().hide();
  //     $('.kkbook4').stop().hide()
  //   });
  //   $('.kkbook li:nth-child(3)').mouseenter(function(){
  //     $('.kkbook4').stop().css('display','flex').fadeIn();
  //     $('.kkbook2').stop().hide();
  //     $('.kkbook3').stop().hide()
  //   });
  // });
  $(document).ready(function () {
    const boxes = ['.kkbook2', '.kkbook3', '.kkbook4'];
  
    $('.kkbook li').mouseenter(function () {
      const index = $(this).index();
      
      // 모두 숨기고
      boxes.forEach(box => $(box).stop().hide());
  
      // 해당 박스만 보여주기
      if (boxes[index]) {
        $(boxes[index]).stop().css('display', 'flex').fadeIn();
      }
    });
  });
  
  async function bookData() {
    const params = new URLSearchParams({
      target: 'title',
      query: '테일러',
      size:4
      
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
  
     
      
      for(let i=0;i<data.documents.length;i++){
        const book = data.documents[i];
       
      $('.bigbook').append("<img src="+book.thumbnail+">")
    }
    } catch (error) {
      console.error('오류발생:', error);
      $('.searchbook-container').append('<p>데이터 로드 중 오류 발생</p>');
    }
  }
  bookData();