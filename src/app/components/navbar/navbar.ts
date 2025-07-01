import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FontAwesomeModule, NgbCollapse],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  faHeart = faHeartRegular;
  faBookmark = faBookmarkRegular;
  faSearch = faSearch;
  isCollapsed = true;
}
