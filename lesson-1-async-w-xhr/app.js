(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const nyTimesRequest = $.ajax(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4ba5d0892231481ea5300465875d7bc2`);
        nyTimesRequest.done(addArticle);

        const unsplashRequest = $.ajax({url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID a217698db8996bc5efd3bcb8e00a5d0cf5a81b89f44bb1d6120ed2563f2d5cd7'
            }
        });

        unsplashRequest.done(addImage);

    });


    function addImage(data) {
        let htmlContent = '';
        //const data = JSON.parse(this.responseText);


        if(data && data.results[0] && data.results){
            const firstData = data.results[0];
            htmlContent = `
            <figure>
                <img src="${firstData.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstData.user.name}</figcaption> 
            </figure>`;

        }else{
            htmlContent = `<div class="error-no-image">No image was found!!!</div>`;
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }



    function addArticle(data) {
        let htmlContent = '';
       // const data = JSON.parse(this.responseText);

        if(data && data.response.docs && data.response.docs.length>1){
            htmlContent = '<ul>'+ data.response.docs.map(article =>
            `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
            </li>`).join('')
            +'</ul>'
        } else {
            htmlContent = `<div class="error-no-image">No article was found!!!</div>`;
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);

    }

})();
