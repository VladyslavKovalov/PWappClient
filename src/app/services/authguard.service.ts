import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Helpers } from './Helpers';

@Injectable()
export class AuthguardService implements CanActivate {



  /**
   * Decides if a route can be activated.
   */


  constructor(public authenticationService: AuthenticationService, private router: Router, public Helpers: Helpers) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.Helpers.tokenNotExpired()) {
      // Signed in.
      return true;
    }

    // Stores the attempted URL for redirecting.
    let url: string = state.url;
    this.authenticationService.redirectUrl = url;

    // Not signed in so redirects to signin page.
    this.router.navigate(['/Signup']);

    return false;
  }

}