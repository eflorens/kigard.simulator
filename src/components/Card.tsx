import {
  Card as CardStrap,
  CardProps as CardStrapProps,
  CardBody as CardBodyStrap,
  CardBodyProps as CardBodyStrapProps,
  CardHeader as CardHeaderStrap,
  CardHeaderProps as CardHeaderStrapProps,
  CardTitle as CardTitleStrap,
  CardTitleProps as CardTitleStrapProps,
  CardSubtitle as CardSubtitleStrap,
  CardSubtitleProps as CardSubtitleStrapProps,
  CardColumns as CardColumnsStrap,
  CardColumnsProps as CardColumnsStrapProps,
  CardGroup as CardGroupStrap,
  CardGroupProps as CardGroupStrapProps
} from 'reactstrap';

import './Card.scss';

interface CardProps extends CardStrapProps {

}

export function Card(props: CardProps) {
  return <CardStrap {...props} />
}

interface CardBodyProps extends CardBodyStrapProps {

}

export function CardBody(props: CardBodyProps) {
  return <CardBodyStrap {...props} />
}

interface CardHeaderProps extends CardHeaderStrapProps {

}

export function CardHeader(props: CardHeaderProps) {
  return <CardHeaderStrap {...props} />
}

interface CardTitleProps extends CardTitleStrapProps {

}

export function CardTitle(props: CardTitleProps) {
  return <CardTitleStrap {...props} />
}

interface CardSubtitleProps extends CardSubtitleStrapProps {

}

export function CardSubtitle(props: CardSubtitleProps) {
  return <CardSubtitleStrap {...props} />
}

interface CardColumnsProps extends CardColumnsStrapProps {

}

export function CardColumns(props: CardColumnsProps) {
  return <CardColumnsStrap {...props} />
}

interface CardGroupProps extends CardGroupStrapProps {

}

export function CardGroup(props: CardGroupProps) {
  return <CardGroupStrap {...props} />
}