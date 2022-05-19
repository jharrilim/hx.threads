import { faHeart, faReply, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Comment.module.css';
import type { Reaction } from '../types';

const Reactions = ({ reactions }: { reactions: Reaction[] }) => {
  const icons = Array
    .from(new Set(reactions.map(r => r.type)))
    .map((type, i) => {
      switch (type) {
        case 'like':
          return <FontAwesomeIcon
            key={i}
            color="#009CEB"
            icon={faThumbsUp}
            width={16}
            height={16}
          />;
        case 'love':
          return <FontAwesomeIcon
            key={i}
            color="#FF006B"
            icon={faHeart}
            width={16}
            height={16}
          />;
        default:
          break;
      }
    });

  const nameText = ((reactions) => {
    if (reactions.length === 0)
      return <></>;
    if (reactions.length === 1)
      return <span>{reactions[0].name} {reactions[0].type}d this</span>
    if (reactions.length === 2)
      return <span>{reactions[0].name} and {reactions[1].name} reacted</span>
    return <span>
      {reactions[0].name}, {reactions[1].name}, and {reactions.length - 2} other{reactions.length - 2 > 1 ? 's' : ''}
    </span>;
  })(reactions);
  return <>
    {icons} {nameText}
  </>;
}


export interface CommentProps {
  top?: boolean;
  text?: string;
  avatar?: string;
  name?: string;
  postedAt?: string;
  reactions?: Reaction[];
}

export const Comment: React.FC<CommentProps> = ({
  top = false,
  text = '',
  avatar = '',
  name = '',
  postedAt = '',
  reactions = [],
}) =>
  <section className={[top ? styles.top : '', styles.comment].join(' ')}>
    <header className={styles.header}>
      <img width={32} height={32} src={avatar} className={styles.avatar} alt="avatar" />
      <span className={styles.name}>{name}</span>
      <span className={styles.postedAt}>{postedAt}</span>
    </header>
    <div className={styles.text}>
      {text}
    </div>
    <footer className={styles.footer}>
      <div className={styles.reactions}>
        <Reactions reactions={reactions} />
      </div>
      <div className={styles.reply}>
        <FontAwesomeIcon icon={faReply} width={16} color="#8B95A2" />
        Reply
      </div>
    </footer>
  </section>;


export default Comment;
