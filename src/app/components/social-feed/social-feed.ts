import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent } from 'models';

@Component({
    selector: 'social-feed',
    templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit {
    items: Post[] = [];
    channelId: string;

    constructor(
        private postService: PostService,
        private postSocket: PostSocketService,
        private route: ActivatedRoute
    ) { }

    onSubmit(message: string) {
        //TODO utiliser le postSerice pour ajouter le message
        this.postService.post(this.channelId,message);
    }

    ngOnInit() {
        this.postSocket.onPost((post)=>{this.items.unshift(post)})
        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
                this.postService
                    .getAll(this.channelId)
                    .then((items) => {
                        this.items = items
                    });
            });
    }
}
