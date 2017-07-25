import { Component, OnInit } from '@angular/core';
import { FilmTvGuideService } from './film-tv-guide.service';

declare let ScrollMagic;
let scrollScene, scrollController;

@Component({
  selector: 'app-film-tv-guide',
  templateUrl: './film-tv-guide.component.html',
  providers: [ FilmTvGuideService ]
})
export class FilmTvGuideComponent implements OnInit {

  isLoading = true;
  modalShowing = false;
  storagePrefix = '';
  section = '';
  searchTerm = '';
  pageNumber = 1;
  feedData = [];
  modalData: any;
  navHidden = true;
  user = {
    favourites: [],
    watched: []
  };
  sections = [];

  constructor(private filmTvGuideService: FilmTvGuideService) {
    this.section = 'movie';
    this.searchTerm = 'popular';
    this.storagePrefix = 'osbFilmTvGuide.user';
    this.sections = [
      {name: 'Popular Movies', section: 'movie', searchTerm: 'popular', icon: 'fa-film'},
      {name: 'Upcoming Movies', section: 'movie', searchTerm: 'upcoming', icon: 'fa-film'},
      {name: 'Top Rated Movies', section: 'movie', searchTerm: 'top_rated', icon: 'fa-film'},
      {name: 'Popular TV Shows', section: 'tv', searchTerm: 'popular', icon: 'fa-desktop'},
      {name: 'Top Rated TV Shows', section: 'tv', searchTerm: 'top_rated', icon: 'fa-desktop'}
    ];
  }

  ngOnInit() {
    this.getData(this.section, this.searchTerm, this.pageNumber);
    if (localStorage.getItem('osbFilmTvGuide.user')) {
      this.user = JSON.parse(localStorage.getItem('osbFilmTvGuide.user'));
    }
  }

  getDetails(id) {
    this.filmTvGuideService.getDetails(this.section, id).subscribe(
      details => this.setDetails(details),
      error => this.handleError(error)
    );
  }

  setDetails(details) {
    this.modalData = details;
    this.modalShowing = true;
  }

  getData(section, searchTerm, pageNumber) {
    this.filmTvGuideService.getData(section, searchTerm, pageNumber).subscribe(
      listings => this.setData(listings),
      error => this.handleError(error)
    );
  }

  getMoreData() {
    this.pageNumber = this.pageNumber + 1;
    this.filmTvGuideService.getData(this.section, this.searchTerm, this.pageNumber).subscribe(
      listings => this.setMoreData(listings),
      error => this.handleError(error)
    );
  }

  setMoreData(listings) {
    const listingResults = listings.results;
    listingResults.forEach((item) => {
      this.feedData.push(item);
    });
  }

  setData(listings) {
    console.log(listings);
    this.feedData = listings.results;
    this.isLoading = false;
    this.feedData.forEach((item) => {
      this.checkFavourites(item.id);
      this.checkWatched(item.id);
    });
    this.startScroller();
  }

  addFavourite(id) {
    if (this.user.favourites) {
      let exists = false;
      this.user.favourites.forEach(function(element, index, array) {
        if (element.id === id) {
          exists = true;
        }
      });
      // If the id doesn't exist add
      if (!exists) {
        this.user.favourites.push({'section': this.section, 'id': id});
        localStorage.setItem(this.storagePrefix, JSON.stringify(this.user));
      }
    }
    this.checkFavourites(id);
  }

  checkFavourites(id) {
    this.user.favourites.forEach(function(element) {
      if (element.id === id) {
        setTimeout(function() {
          const matchElement = document.getElementById(id);
          matchElement.querySelector('.favouriteBtn').classList.add('favouriteActive');
        }, 100);
      }
    });
  }

  addWatched(id) {
    if (this.user.watched) {
      let exists = false;
      this.user.watched.forEach(function(element, index, array) {
        if (element.id === id) {
          exists = true;
        }
      });
      // If the id doesn't exist add
      if (!exists) {
        this.user.watched.push({'section': this.section, 'id': id});
        localStorage.setItem(this.storagePrefix, JSON.stringify(this.user));
      }
    }
    this.checkWatched(id);
  }

  checkWatched(id) {
    this.user.watched.forEach(function(element) {
      if (element.id === id) {
        setTimeout(function() {
          const matchElement = document.getElementById(id);
          matchElement.querySelector('.watchedBtn').classList.add('watchedActive');
        }, 100);
      }
    });
  }

  startScroller() {
    const holder = this;
    setTimeout(function() {
      scrollController = new ScrollMagic.Controller();
      scrollScene = new ScrollMagic.Scene({triggerElement: '#filmLoader', triggerHook: 'onEnter'})
        .addTo(scrollController)
        .on('enter', (e) => {
          if (document.querySelector('#filmLoader').className.indexOf('active') === -1) {
            holder.getMoreData();
          }
        });
      scrollScene.update();
    }, 500);
  }

  handleError(error) {
    console.log(error);
  }

  closeModal() {
    this.modalShowing = false;
    this.modalData = {};
  }
}
