import avatarSrc from '../../static/images/avatar.png';

export function getAvatar(avatar: string | null): string {
  return (avatar === null || avatar === '') ? avatarSrc : `https://ya-praktikum.tech/api/v2/resources/${avatar}`;
}
