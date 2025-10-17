export interface Avatar {
  id: string;
  name: string;
  image?: string;
}

export interface UiUserAvatarGroupProps {
  users: Avatar[];
  max?: number;
  size?: number;
}

export const UiUserAvatarGroupDefaults = {
  max: 5,
  size: 36,
};
