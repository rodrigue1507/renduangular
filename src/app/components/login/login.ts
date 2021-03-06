import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';

/**
 * Connecte un utilisateur à la plateforme
 */


@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    failed = false;
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
     }

    async login() {
        this.failed = false;
        
        try {
            // TODO utiliser authService en async/await pour authentifier l'utilisateur
            await this.authService.authenticate(this.model)
            // TODO redirection sur "/"
            this.router.navigate(['/']);
        }
        catch (e) {
            return this.failed = true;
        }
    }
}
