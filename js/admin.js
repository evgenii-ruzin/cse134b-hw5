document.addEventListener('DOMContentLoaded', init);

function init() {
  const form = document.querySelector('#crud-form');

  let data = JSON.parse(localStorage.getItem('data')) || [];
  let way = 'L';
  let action = 'C';

  const local = document.querySelector('#lor1');
  const remote = document.querySelector('#lor2');

  const create = document.querySelector('#create-form');
  const create_btn = document.querySelector('#create-submit');

  const update = document.querySelector('#update-form');
  const update_btn = document.querySelector('#update-submit');
  const select_u = document.querySelector('#update-select');

  const del = document.querySelector('#delete-form');
  const del_btn = document.querySelector('#delete-submit');
  const select_d = document.querySelector('#delete-select')

  populate_lists()

  local.addEventListener('change', (e) => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    way = 'L';
    console.log(data);
    populate_lists();
  });

  remote.addEventListener('change', (e) => {
    way = 'R';
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        data = JSON.parse(req.responseText);
        console.log(data);
        populate_lists();
      }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/69320328d0ea881f40135fc9", true);
    req.setRequestHeader("X-Master-Key", "$2a$10$kcHzWxU8uEWQfkpr11ZvjuedtH68XQgCmq2fplFzFtycGXXqFZ3h2");
    req.setRequestHeader("X-Bin-Meta", "false");
    req.send();
  });

  form.addEventListener('change', (e) => {
    const target = e.target;

    if (target.name === 'cud') {
      action = target.value;

      if (action === 'C') {
        update.setAttribute('disabled', '');
        update.style.display = 'none';
        del.setAttribute('disabled', '');
        del.style.display = 'none';
        create.removeAttribute('disabled');
        create.style.display = 'grid';
      }
      else if (action === 'U') {
        populate_lists();
        create.setAttribute('disabled', '');
        create.style.display = 'none';
        del.setAttribute('disabled', '');
        del.style.display = 'none';
        update.removeAttribute('disabled');
        update.style.display = 'grid';
        populate_lists();
      }
      else if (action === 'D') {
        populate_lists()
        update.setAttribute('disabled', '');
        update.style.display = 'none';
        create.setAttribute('disabled', '');
        create.style.display = 'none';
        del.removeAttribute('disabled');
        del.style.display = 'grid';
        populate_lists();
      }
    }
  });

  create_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector('fieldset>*:invalid');

        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });

          firstInvalid.reportValidity();
        }

        return;
      }
    }

    const form_val = {
      name: form.cName.value,
      year: form.cYear.value,
      type: form.cType.value,
      img: form.cImg.value,
      alt: form.cAlt.value,
      description: form.cDescription.value,
      learn_more: form.cUrl.value
    };

    data.push(form_val);

    upload_data('added');
  });

  select_u.addEventListener('change', (e) => {
    const i = Number(e.target.value);
    form.uName.value = data[i].name;
    form.uYear.value = data[i].year;
    form.uType.value = data[i].type;
    form.uImg.value = data[i].img;
    form.uAlt.value = data[i].alt;
    form.uDescription.value = data[i].description;
    form.uUrl.value = data[i].learn_more;
  })

  update_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector('fieldset>*:invalid');

        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });

          firstInvalid.reportValidity();
        }

        return;
      }
    }

    const form_val = {
      name: form.uName.value,
      year: form.uYear.value,
      type: form.uType.value,
      img: form.uImg.value,
      alt: form.uAlt.value,
      description: form.uDescription.value,
      learn_more: form.uUrl.value
    };

    data[select_u.value] = form_val;

    upload_data('updated');
  })

  select_d.addEventListener('change', (e) => {
    const i = Number(e.target.value);
    form.dName.value = data[i].name;
    form.dYear.value = data[i].year;
    form.dType.value = data[i].type;
    form.dImg.value = data[i].img;
    form.dAlt.value = data[i].alt;
    form.dDescription.value = data[i].description;
    form.dUrl.value = data[i].learn_more;
  })

  del_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector('fieldset>*:invalid');

        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });

          firstInvalid.reportValidity();
        }

        return;
      }
    }

    const i = select_d.value;
    data.splice(i, 1);

    upload_data('deleted');
  })

  function populate_lists() {
    select_u.innerHTML = '';
    select_d.innerHTML = '';
    const def_option1 = document.createElement('option');
    const def_option2 = document.createElement('option');
    def_option1.value = '';
    def_option1.setAttribute('selected', '');
    def_option1.setAttribute('disabled', '');
    def_option2.value = '';
    def_option2.setAttribute('selected', '');
    def_option2.setAttribute('disabled', '');
    select_u.appendChild(def_option1);
    select_d.appendChild(def_option2);
    for (let i = 0; i < data.length; i++) {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.text = data[i].name;
      option1.value = i.toString();
      option2.text = data[i].name;
      option2.value = i.toString();
      select_u.appendChild(option1);
      select_d.appendChild(option2);
    }
  }

  function upload_data(a) {
    if (way === 'R') {
      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          if (req.status >= 200 && req.status < 300) {
            const response = JSON.parse(req.responseText);
            console.log(response);
            alert(`Successfully ${a} entry to REMOTE storage`);
          } else {
            alert(`HTTP Error: ${req.status}: ${req.responseText}`);
          }
        }
      };

      req.open("PUT", "https://api.jsonbin.io/v3/b/69320328d0ea881f40135fc9", true);
      req.setRequestHeader("X-Master-Key", "$2a$10$kcHzWxU8uEWQfkpr11ZvjuedtH68XQgCmq2fplFzFtycGXXqFZ3h2");
      req.setRequestHeader("X-Bin-Meta", "false");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(data));
    }
    else if (way === 'L') {
      localStorage.setItem('data', JSON.stringify(data));
      alert(`Successfully ${a} entry to LOCAL storage`);
    }

    way = 'L';
    form.reset();

    update.setAttribute('disabled', '');
    update.style.display = 'none';
    del.setAttribute('disabled', '');
    del.style.display = 'none';
    create.removeAttribute('disabled');
    create.style.display = 'grid';
    data = JSON.parse(localStorage.getItem('data'));
  }
}