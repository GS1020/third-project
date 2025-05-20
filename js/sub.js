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

    } catch(error){
        console.error('오류발생:',error);
    }
}
subbook1();