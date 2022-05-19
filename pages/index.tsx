
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Comment from '../components/comment';
import Search from '../components/search';
import styles from '../styles/Home.module.css';
import type { Thread } from '../types';

const mockThreads: Thread[] = [
  {
    comments: [
      {
        text: 'How do you feel about the longevity of the shoe?',
        avatar: `https://i.pravatar.cc/50?u=vivian`,
        name: 'Vivian',
        postedAt: '2 days ago',
        reactions: [
          { name: 'Yogurt Queen', type: 'love' },
          { name: 'Yung Yote', type: 'like' },
          { name: 'Mo', type: 'like' },
        ],
      },
      {
        text: 'Ive had my pair for 3 years now and use it pretty frequently and theyre holding up very nice',
        avatar: `https://i.pravatar.cc/50?u=yungyote`,
        name: 'Yung Yote',
        postedAt: '2 days ago',
        reactions: [
          { name: 'Izzy P.', type: 'like' },
        ],
        badge: {
          icon: 'verified',
          text: 'Influencer',
        }
      },
      {
        text: 'I have the black ones and they dont even get dirty, had them 5 years now and no issues',
        avatar: `https://i.pravatar.cc/50?u=mcflymyguy`,
        name: 'McFly MyGuy',
        postedAt: '2 days ago',
      },
    ],
  },
  {
    comments: [
      {
        text: 'I bought these shoes for my childhood best friend and he ran all the way from Greenview Alabama to the Pacific ocean',
        avatar: `https://i.pravatar.cc/50?u=jenny`,
        name: 'Jennae',
        postedAt: '1 day ago',
        reactions: [
          { name: 'Florist Chump', type: 'like' },
          { name: 'Bubb A.', type: 'like' },
          ...Array(1330).fill(0).map(_ => ({ name: 'Ron F. Letterkenny', type: 'like' }) as const)
        ]
      },
      {
        text: 'Thank you Jennae 👟👟',
        avatar: `https://i.pravatar.cc/50?u=floristchump`,
        name: 'Florist Chump',
        postedAt: '8 hours ago',
        reactions: [ { name: 'Jennae', type: 'love' } ],
      },
      {
        text: 'omg so cute 🥺',
        avatar: `https://i.pravatar.cc/50?u=dan`,
        name: 'Dan Dan',
        postedAt: '33 minutes ago',
      }
    ]
  }
];

const mockCategories = ['reviews', 'raves', 'sizing'];

const mockProduct = {
  name: `Nike Air Force 1 '07`,
  image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/gsuin11ptg5qgktmzoat/air-force-1-07-shoe-KyTDGepj.png',
}

export async function getServerSideProps() {
  return {
    props: {
      threads: mockThreads,
      categories: mockCategories,
      product: mockProduct,
    },
  };
}

interface HomeProps {
  threads: Thread[];
  categories: string[];
  product: {
    image: string;
    name: string;
  };
}

const Home: NextPage<HomeProps> = ({
  threads,
  categories,
  product,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Threads hackathon mockup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.navBack}>
          
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.post}>
          <Search categories={categories} />
        </div>

        {threads.map((thread, i) => (
          <div key={i} className={styles.post}>
            {thread.comments.map((comment, i) => (
              <Comment
                key={i + comment.text}
                top={i === 0}
                text={comment.text}
                avatar={comment.avatar}
                name={comment.name}
                postedAt={comment.postedAt}
                reactions={comment.reactions}
              />
            ))}
          </div>
        ))}
      </main>
      <aside className={styles.aside}>
        <div className={styles.product}>
          <img
            className={styles.productImage}
            src={product.image}
            alt={product.name}
            width={200}
            />
          <span className={styles.productName}>
            {product.name}
          </span>
        </div>
        <div className={styles.community}>
          <h3 className={styles.communityHeader}>Community</h3>
          <ul className={styles.communityMembers}>
              {Array.from(
                new Set(
                  threads
                    .flatMap(t => t.comments)
                    .map(c => ({ name: c.name, avatar: c.avatar, badge: c.badge })
                ))
              ).map(member => (
                <div key={member.name} className={styles.communityMember}>
                  <img className={styles.avatar} src={member.avatar} alt={member.name} />
                  <div className={styles.nameAndBadge}>
                    <span className={styles.communityMemberName}>{member.name}</span>
                    {member.badge &&
                      <span className={styles.badge}>
                        {member.badge.icon &&
                          <FontAwesomeIcon icon={faBadgeCheck} color="#00aced" width={14} height={14} />
                        }
                        <span>
                          {member.badge.text}
                        </span>
                      </span>                    
                    }
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Home
