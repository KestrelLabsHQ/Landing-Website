export type Author = {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatarSrc?: string; // public/ path
};

export const authors: Record<string, Author> = {
  daymian: {
    id: "daymian",
    name: "Daymian",
    title: "Founder & Principal Engineer",
    bio: "Real constraints, real systems. Build what’s useful, be clear about tradeoffs, leave things sturdier than before.",
    avatarSrc: "/founder/founder-ds-update.png",
  },
};

export const defaultAuthor = authors.daymian;
