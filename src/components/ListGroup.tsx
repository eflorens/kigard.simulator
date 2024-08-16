import {
	List as ListStrap,
	ListProps as ListPropsStrap,
	ListGroup as ListGroupStrap,
	ListGroupProps as ListGroupPropsStrap,
	ListGroupItem as ListGroupItemStrap,
	ListGroupItemProps as ListGroupItemPropsStrap,
} from 'reactstrap';

interface ListProps extends ListPropsStrap {
}

export function List(props: Readonly<ListProps>) {
	return (
		<ListStrap {...props} />
	)
}

interface ListGroupProps extends ListGroupPropsStrap {
}

export function ListGroup(props: Readonly<ListGroupProps>) {
	return (
		<ListGroupStrap {...props} />
	)
}

interface ListGroupItemProps extends ListGroupItemPropsStrap {
}

export function ListGroupItem(props: Readonly<ListGroupItemProps>) {
	return (
		<ListGroupItemStrap {...props} />
	)
}