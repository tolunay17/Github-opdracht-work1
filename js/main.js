const gentse_feesten_artists = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const events_url = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
(() => {
  const app = {
    initialize() {
      console.log('1 App started');
      this.cacheElements();
      this.buildUI();
      // this.hamburgerMenu();
      // this.gentse_feesten_artists();
      this.eventListener();
      // this.readUrlParam();
      this.fetchCategorie();
      
    },
    cacheElements() {
      console.log('2. Caching the elemnts');
      this.$data = document.querySelector('.artist-all');
      this.$button = document.querySelector('.hamburger');
      this.$button2 = document.querySelector('.mobile-close');
      this.$event = document.querySelector('.artist-all-two')
      this.$container = document.querySelector('.container__ul');
      this.$container = document.querySelector('.container__two-ul');
      this.$gridContent = document.querySelector('.gridContent');
    },
    buildUI() {
      console.log('3. Build the user interface');
      // this.$data.innerHTML = this.gentse_feesten_artists();
      if (this.$data) {
        this.$data.innerHTML = this.gentse_feesten_artists();
      }
      if (this.$event) {
        this.$event.innerHTML = this.gentse_feesten_artistsData();
      }
    },
    hamburgerMenu() {
      let box = document.querySelector(".mobile-nav")
      console.log(box)
      if (box.classList.contains('open')) {
        box.classList.remove('open');
      } else {
        box.classList.add('open');
      }
      let list = document.querySelector('.toggle')
      if (list.classList.contains('open')) {
        list.classList.remove('open');
      } else {
        list.classList.add('open');
      } 

      let toggle = document.querySelector('.toggle')
      if (toggle.classList.contains('open')) {
        toggle.classList.remove('open')
      } else {
        toggle.classList.add('open');
      }

    },
    
    eventListener(){
      this.$button.addEventListener('click', () => this.hamburgerMenu());
      this.$button2.addEventListener('click', () => this.hamburgerMenu());
    },
    gentse_feesten_artists() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.gentseFeesten(json));
      // .then(json => {
      //   this.gentseFeesten = json;
      //   this.gentseFeestenDay();
      // })
    },
    gentseFeesten(data) {
      let tempStr = '';
      data.slice(0, 3).forEach(evt => {
        tempStr += `
        <article class="artist">
        <img src=${evt.image.thumb}>
        <div class="artist-time">
        <h3>${evt.day} Jul ${evt.start} u.</h3>
        </div>
        <div class="artist-info">
        <h3>${evt.title}</h3>
        <h4>${evt.location}</h4>
        </div>
        </article>
        `
      });
      return this.$data.innerHTML = tempStr;
    },
    gentse_feesten_artistsData() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.readUrlParam(json));
    },

    readUrlParam(event) {
      // locatie
      const search = window.location.search;
      // urlparameters
      const params = new URLSearchParams(search);
      // get urlparameters
      const type = params.get('day');

      if(type !== null) {
        let tempStr = '';
        event.map(short => {
            if (short.day === type) {
              tempStr += `
        <article class="artist-sec">
        <ul><li>
        <a href="${short.slug}">
        <img src="${short.image !== null ? short.image.thumb : "_static/media/default.jpg"}">
        <div class="artist-sec-time">
        <h3>${short.start} u.</h3>
        </div>
        <div class="artist-sec-info">
        <h3>${short.title}</h3>
        <h4>${short.location}</h4>
        </div>
        </a>
        </li></ul>
        </article>
              `
            return this.$event.innerHTML = tempStr;
          } 
        }) 
      }
    },
    fetchCategorie() {
      fetch(events_url)
      .then((response) => response.json())
      .then((json) => {
        this.categories = json;
        this.fetchEvents();
      })
      .catch((e) => console.log(e));
    },
    fetchEvents() {
      fetch(gentse_feesten_artists) 
        .then((response) => response.json())
        .then ((json) => {
          this.events = json;
          this.populateHtml();
          this.gridContentHtml();
        })
        .catch((e) => console.log(e))
    },
    populateHtml() {      
      console.log(this.categories);
      console.log(this.events);
      
      let tempStr = '';
      this.categories.map((event) => {
        return this.$container.innerHTML += tempStr;
      })
      let html = this.categories.map((category) => {
        return`
        <li><a href="detail.html#${category}">${category}</a></li>
        `
      }).join('');
      return this.$container.innerHTML = html;
    },

    gridContentHtml() {
      let html = this.categories.map((category) => {
        const filteredEvents = this.events.filter((event)=> {
          return event.category.indexOf(category) > -1; 
        });
        const listItems = filteredEvents.map((event) => {
          return `
          
          <li><article>
              <img src="${event.image !== null ? event.image.thumb : "_static/media/default.jpg"}">
              <div class="artist-time">
                <h3>${event.start} u.</h3>
              </div>
              <div class="artist-info">
                <h3>${event.title}</h3>
                <h4>${event.location}</h4>
              </div>
        </article></li>
          `;          
        }).join('');
        return `
        <article class="artist">
          <h2 id="${category}">${category}</h2>
         <ul>
        ${listItems}
         </ul>
        </article>`
      }).join('');
      this.$gridContent.innerHTML = html;
    },
  }
  app.initialize();
})();
