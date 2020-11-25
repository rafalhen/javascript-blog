{
'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event');
  
    /* [DONE} remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    
    console.log('articleSelector');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    console.log('targetArticle');

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.immerHTML = '';

    console.log('optTitleListSelector');

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){
      
      /* get the article id */

      const articleId = article.getAttribute('id')

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log('linkHTML');
    
      /* create html of the link */

      html = html + linkHTML;

      console.log('html');

      } 

    titleList.innerHTML = html;

    /* insert link into titleList */
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }  
  }
  
  generateTitleLinks();



/* generatetags */

  function generateTags(){
    /* find all articles*/
    const articles = document.querySelectorAll('.post');
    console.log(articles);
    /* START LOOP: for every article */
    for(let article of articles){

      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHtml);
        /* add generated code to html variable */
        html = html + linkHtml;
      /* END LOOP: for each tag */
      
      }

      tagWrapper.innerHTML = html;

      /* insert HTML of all the links into the tags wrapper */
      const tagList = document.querySelectorAll('a[href^="#tag-"]');
      for(let tag of tagList) {
        tag.addEventListener('click', titleClickHandler);
      }
    /* END LOOP: for every article: */

    }

  }

  generateTags()

/*tagClickHandler*/

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){

      /* remove class active */
      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let foundTagLink of FoundTagLinks){

      /* add class active */
      foundTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const linkTags = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for(let linkTag of linkTags){

      /* add tagClickHandler as event listener for that link */
      linkTag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    } 
  }

  addClickListenersToTags();
}