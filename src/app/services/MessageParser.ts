import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);
        if (pictureMatche) {
            // retourner une instance de PicturePostContent
            return new PicturePostContent(post.content.value);
        }

        const videoRegex = / /gmi;  // TODO
        // retourner une instance de VideoPostContent si match
        const videoMatche = videoRegex.exec(post.message);
        if(videoMatche){
            return new VideoPostContent(post.content.value);
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        // retourner une instance de YoutubePostContent si match
        const youtubeMatche = youtubeRegex.exec(post.message);
        if(youtubeMatche){
            return new YoutubePostContent(post.content.value);
        }
        return null;
    }
}
