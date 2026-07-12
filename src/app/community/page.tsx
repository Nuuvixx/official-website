import { Metadata } from "next";
import styles from "./community.module.css";
import { GithubLogo, XLogo, DiscordLogo, ChatCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Community | Nuuvixx",
  description: "Join the Nuuvixx open-source community.",
};

const channels = [
  {
    name: "GitHub Discussions",
    description: "For architecture proposals, feature requests, and technical help.",
    icon: <GithubLogo size={32} weight="fill" />,
    url: "https://github.com/orgs/Nuuvixx/discussions",
    color: "#ffffff"
  },
  {
    name: "Discord Server",
    description: "Real-time chat, voice channels, and engineering hangouts.",
    icon: <DiscordLogo size={32} weight="fill" />,
    url: "#",
    color: "#5865F2"
  },
  {
    name: "X (Twitter)",
    description: "Announcements, release notes, and high-level strategy.",
    icon: <XLogo size={32} weight="fill" />,
    url: "#",
    color: "#ffffff"
  },
  {
    name: "Developer Blog",
    description: "Deep technical dives written by the core team.",
    icon: <ChatCircle size={32} weight="fill" />,
    url: "/blog",
    color: "var(--color-volt)"
  }
];

export default function CommunityPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Community</h1>
        <p className={styles.subtitle}>
          Nuuvixx is an open-source organization built by hundreds of engineers. 
          Here is how you can join us.
        </p>
      </header>

      <div className={styles.grid}>
        {channels.map((channel) => (
          <a href={channel.url} key={channel.name} className={styles.card}>
            <div className={styles.iconWrapper} style={{ color: channel.color }}>
              {channel.icon}
            </div>
            <h2 className={styles.channelName}>{channel.name}</h2>
            <p className={styles.channelDesc}>{channel.description}</p>
          </a>
        ))}
      </div>
      
      <div className={styles.bountySection}>
        <h2 className={styles.bountyTitle}>Open Source Bounties</h2>
        <p className={styles.bountyDesc}>
          We regularly post funded issues for critical path features on our roadmap.
          Check the GitHub issue tracker for the <code>bounty</code> label.
        </p>
        <a href="https://github.com/Nuuvixx" className={styles.btnPrimary}>View Open Bounties</a>
      </div>
    </div>
  );
}
