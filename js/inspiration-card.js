class InspirationCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
        :host {
        height: var(--ic-height);
        min-height: fit-content;
        width: var(--ic-width);
        padding: var(--ic-padding);
        margin: var(--ic-margin);
        border: var(--ic-border);
        border-radius: var(--ic-border-radius);
        background: var(--tile-background, white);
        backdrop-filter: blur(10px);
        box-shadow: var(--tile-shadow, none);
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .data {
          width: fit-content;
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: 1fr 1fr;
          
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        }
        
        img {
          width: var(--ic-img-width);
          height: var(--ic-img-height);
          object-fit: contain;
        }
        }`
    const name = this.getAttribute("name") || 'Default name';
    const release = this.getAttribute("year") || '2025';
    const type = this.getAttribute("type") || 'Default type';
    const img_link = this.getAttribute("img") || '';
    const alt_text = this.getAttribute("alt") || 'no alt text';
    const description = this.getAttribute("description") || 'No description';
    const more_link = this.getAttribute("learn-more") || 'javascript:void(0)';

    const h = document.createElement('h2');
    h.innerHTML = name;
    const p1 = document.createElement('p');
    p1.innerHTML = release;
    const p2 = document.createElement('p');
    p2.innerHTML = type;

    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = img_link;
    img.alt = alt_text;
    picture.appendChild(img);

    const div_data = document.createElement('div');
    div_data.classList.add('data');
    const div_image = document.createElement('div');
    div_image.classList.add('image');
    const div_info = document.createElement('div');
    div_info.classList.add('info');
    div_image.appendChild(picture);
    div_info.appendChild(h);
    div_info.appendChild(p1);
    div_info.appendChild(p2);
    div_data.appendChild(div_image);
    div_data.appendChild(div_info);

    const p3 = document.createElement('p');
    p3.innerHTML = description;
    const a = document.createElement('a');
    a.href = more_link;
    a.innerHTML = 'Learn more';

    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(div_data);
    this.shadowRoot.appendChild(p3)
    this.shadowRoot.appendChild(a)
  }
}

customElements.define('inspiration-card', InspirationCard);