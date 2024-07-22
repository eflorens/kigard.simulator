import {
    Badge as BadgeStrap,
    BadgeProps as BadgeStrapProps
} from 'reactstrap';

interface BadgeProps extends BadgeStrapProps {

}

export function Badge(props: BadgeProps) {
  return <BadgeStrap {...props} />
}