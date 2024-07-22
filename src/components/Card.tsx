import {
  Card as CardStrap,
  CardProps as CardStrapProps,
  CardBody as CardBodyStrap,
  CardBodyProps as CardBodyStrapProps,
  CardHeader as CardHeaderStrap,
  CardHeaderProps as CardHeaderStrapProps,
  CardColumns as CardColumnsStrap,
  CardColumnsProps as CardColumnsStrapProps,
  CardGroup as CardGroupStrap,
  CardGroupProps as CardGroupStrapProps
} from 'reactstrap';

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