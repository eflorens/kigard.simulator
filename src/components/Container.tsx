import {
    Container as ContainerStrap,
    ContainerProps as ContainerStrapProps,
    Row as RowStrap,
    RowProps as RowStrapProps,
    Col as ColStrap,
    ColProps as ColStrapProps
} from 'reactstrap';

interface ContainerProps extends ContainerStrapProps {

}

export function Container(props: ContainerProps) {
  return <ContainerStrap {...props} />
}

interface RowProps extends RowStrapProps {

}

export function Row(props: RowProps) {
  return <RowStrap {...props} />
}

interface ColProps extends ColStrapProps {

}

export function Col(props: ColProps) {
  return <ColStrap {...props} />
}