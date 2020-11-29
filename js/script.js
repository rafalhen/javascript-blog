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
      console.log(activeArticles);
      for(let activeArticle of activeArticles){
          activeArticle.classList.remove('active');
      }
    
      /* get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute('href');
      
      console.log(articleSelector);
  
      /* find the correct article using the selector (value of 'href' attribute) */
      const targetArticle = document.querySelector(articleSelector);
  
      console.log(targetArticle);
  
      /* add class 'active' to the correct article */
      targetArticle.classList.add('active');
    }
    
    const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';
      optArticleTagsSelector = '.post-tags .list';
      optArticleAuthorSelector = '.post-author';
      optTagListSelector = '.tag.list';
  
    const generateTitleLinks = function(customSelector = ''){
      /* remove contents of titleList */
  
      const titleList = document.querySelector(optTitleListSelector);
      titleList.immerHTML = '';
  
      console.log(optTitleListSelector);
  
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
      /* "NEW" create a new variable allTags with an empty object */
      let allTags = {};
      
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
          const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
          console.log(linkHTML);

          /* add generated code to html variable */
          html = html + linkHTML;

          /* "NEW" check if the link is NOT already in allTags */
          if(!allTags[tag]) {
          /* "NEW" add generated code code to allTags array */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }

        /* END LOOP: for each tag */
        }
  
        /* insert HTML of all the links into the tags wrapper */
        tagWrapper.innerHtml = html;

        const tagList = document.querySelectorAll('a[href^="#tag-"]');
        for(let tag of tagList) {
          tag.addEventListener('click', titleClickHandler);
        }
      /* END LOOP: for every article: */
      }

      /* "NEW" find list of tags in right column */
      const tagList = document.querySelector('.tags');

      /* "NEW" create variable for all links HTML code */
      let allTagsHTML = '';
      
      /* "NEW" START LOOP: for each tag in allTags */
      for(let tag in allTags){
        /* "NEW" generate code of a link and add it to allTagsHTML */
        allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      }

      /* "NEW" add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;

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
      for(let foundTagLink of foundTagLinks){
  
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
  
    /*authors*/
  
    const generateAuthors = function(){
      /* find all authors */
      const articles = document.querySelectorAll(optArticleSelector);
  
      /* START LOOP for every author */
      for(let article of articles) {
  
        /* find author post */
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        console.log(authorWrapper);
        /* make html variable with empty string */
        let html = '';
  
        /* get author from data-author attribute */
        const tagAuthor = article.getAttribute('data-author');
        console.log(tagAuthor);
  
        /* generate html of the link */
        const linkHTML = '<li><a href="#author-' + tagAuthor + '">' + tagAuthor + '</a></li>'; 
        
        /* add generate code to html variable */
        html = html + linkHTML;
  
        /* insert html of all links into the tags wrapper */
        authorWrapper.innerHTML = html;
      /* END LOOP for every article */
      }
  
    }
    
    generateAuthors();
  
    const authorClickHandler = function(event) {
      /* prevent default action for this event */
      event.preventDefault();
  
      /* make a new constant named "clickElement" and give it the value of "this" */
      const clickedElement = this;
  
      /* make a new constant "href" and extract tag from the "href" constant */
      const href = clickedElement.getAttribute('href');
      console.log(href);
      /* make a new constant "tag" and extract tag from the "href" constant */
      const tag = href.replace('#author-', '');
  
      /* find all tag links with class active */
      const activeAuthorLinks = document.querySelectorAll('a.active[href="#author-"]');
  
      /* START LOOP for each active tag links */
      for(let activeAuthorLink of activeAuthorLinks){
  
        /* remove class active */
        activeAuthorLink.classList.remove('active');
  
      /* END LOOP for each active class link */
      }
      /* find all tag links with "href" attribute equal to the "href" constant */
      const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
      console.log(foundAuthorLinks);
  
      /* START LOOP for each found tag link */
      for(let foundAuthorLink of foundAuthorLinks){
  
        /* add class active */
        foundAuthorLink.classList.add('active');
  
      /* END LOOP for each found tag link */
      }
  
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + tag + '"]');
    };
  
    function addClickListenersToAuthors() {
      const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
      for(let linkAuthor of linkAuthors){
        linkAuthor.addEventListener('click', authorClickHandler);
      }
    }
  
    addClickListenersToAuthors();
    
}