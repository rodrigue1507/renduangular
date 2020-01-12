import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';
import { ActivatedRoute } from '@angular/router';

/**
 * Display the channel list, the social feed and the notification bar for logged users.
 * Affiche la liste des channels sur la gauche, les posts au centre, et une barre de notifications sur la gauche
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];

    constructor(
        private channelService: ChannelService,
        private route: ActivatedRoute
    ) {
    }
    sub: EventEmitter<any> = new EventEmitter();
    async ngOnInit() {
        // utiliser le channelService pour récupérer la liste
        this.channels =  await this.channelService.getAll();
        // this.route.firstChild.params permet de connaître les paramètres de l'url
        //this.route.firstChild.params.subscribe((params)=>{this.channels.push(this.channels[params['id']])}) 
    }
}
