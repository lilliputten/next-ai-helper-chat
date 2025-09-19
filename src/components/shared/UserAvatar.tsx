import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from '@/components/ui/Avatar';
import { User as UserIcon } from '@/components/shared/Icons';
import { User } from '@/generated/prisma';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} referrerPolicy="no-referrer" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <UserIcon className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
