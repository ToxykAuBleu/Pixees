import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment, faUser, faShare, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark, faPaperPlane} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent {
  FaHeart = faHeart;
  FaBookmark = faBookmark;
  FaShare = faShare;
  FaComment = faComment;
  FaSend = faPaperPlane;
  FaProfile = faUser;
  FaPlus = faEllipsisVertical;
}
