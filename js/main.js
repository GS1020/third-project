async function bookData() {
    const params = new URLSearchParams({
      target: 'title',
      query: '아빠 당신의 이야기를 들려주세요'
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
          </div>
        </div>
      `;
  
      $('.searchbook-container').append(html);
  
    } catch (error) {
      console.error('오류발생:', error);
      $('.searchbook-container').append('<p>데이터 로드 중 오류 발생</p>');
    }
  }
  
  bookData();
  