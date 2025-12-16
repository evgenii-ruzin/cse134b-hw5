document.addEventListener('DOMContentLoaded', init)

function init() {
  const btn_local = document.querySelector('#button-local');
  const btn_remote = document.querySelector('#button-remote');
  const article = document.querySelector('article');

  btn_local.addEventListener('click', (e) => {
    loadLocal();
  });

  btn_remote.addEventListener('click', (e) => {
    e.preventDefault();
    loadRemote();
  });

  function loadLocal() {
    article.innerHTML = '';

    console.log("getting data")
    const data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    if (data === null || data.length === 0) {
      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          const data = JSON.parse(req.responseText);
          localStorage.setItem('data', JSON.stringify(data));

          data.map((i) => {
            const name = i.name || 'Name not specified';
            const year = i.year || 'Year not specified';
            const type = i.type || 'Type not specified';
            const img = i.img || '';
            const alt = i.alt || 'Image description not specified';
            const description = i.description || 'No description provided'
            const more = i.learn_more || 'javascript:void(0)';

            const elem = document.createElement('inspiration-card');
            elem.setAttribute('name', name);
            elem.setAttribute('year', year);
            elem.setAttribute('type', type);
            elem.setAttribute('img', img);
            elem.setAttribute('alt', alt);
            elem.setAttribute('description', description);
            elem.setAttribute('learn-more', more);

            article.appendChild(elem);
          });
        }
      };

      req.open("GET", "https://api.jsonbin.io/v3/b/69320328d0ea881f40135fc9", true);
      req.setRequestHeader("X-Master-Key", "$2a$10$kcHzWxU8uEWQfkpr11ZvjuedtH68XQgCmq2fplFzFtycGXXqFZ3h2");
      req.setRequestHeader("X-Bin-Meta", "false");
      req.send();
    }
    else {
      data.map((i) => {
        const name = i.name || 'Name not specified';
        const year = i.year || 'Year not specified';
        const type = i.type || 'Type not specified';
        const img = i.img || '';
        const alt = i.alt || 'Image description not specified';
        const description = i.description || 'No description provided'
        const more = i.learn_more || 'javascript:void(0)';

        const elem = document.createElement('inspiration-card');
        elem.setAttribute('name', name);
        elem.setAttribute('year', year);
        elem.setAttribute('type', type);
        elem.setAttribute('img', img);
        elem.setAttribute('alt', alt);
        elem.setAttribute('description', description);
        elem.setAttribute('learn-more', more);

        article.appendChild(elem);
      });
    }
  }

  function loadRemote() {
    article.innerHTML = '';

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        const data = JSON.parse(req.responseText);
        data.map((i) => {
          const name = i.name || 'Name not specified';
          const year = i.year || 'Year not specified';
          const type = i.type || 'Type not specified';
          const img = i.img || '';
          const alt = i.alt || 'Image description not specified';
          const description = i.description || 'No description provided'
          const more = i.learn_more || 'javascript:void(0)';

          const elem = document.createElement('inspiration-card');
          elem.setAttribute('name', name);
          elem.setAttribute('year', year);
          elem.setAttribute('type', type);
          elem.setAttribute('img', img);
          elem.setAttribute('alt', alt);
          elem.setAttribute('description', description);
          elem.setAttribute('learn-more', more);

          article.appendChild(elem);
        });
      }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/69320328d0ea881f40135fc9", true);
    req.setRequestHeader("X-Master-Key", "$2a$10$kcHzWxU8uEWQfkpr11ZvjuedtH68XQgCmq2fplFzFtycGXXqFZ3h2");
    req.setRequestHeader("X-Bin-Meta", "false");
    req.send();
  }
}