import {
  TabContent as TabContentStrap,
  TabContentProps as TabContentStrapProps,
  TabPane as TabPaneStrap,
  TabPaneProps as TabPaneStrapProps,
} from 'reactstrap';

interface TabContentProps extends TabContentStrapProps {
}

export function TabContent(props: Readonly<TabContentProps>) {
  return (
    <TabContentStrap {...props} />
  )
}

interface TabPaneProps extends TabPaneStrapProps {
}

export function TabPane(props: Readonly<TabPaneProps>) {
  return (
    <TabPaneStrap {...props} />
  )
}