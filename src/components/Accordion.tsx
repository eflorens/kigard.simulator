import {
  Accordion as AccordionStrap,
  AccordionProps as AccordionStrapProps,
  AccordionItem as AccordionItemStrap,
  AccordionItemProps as AccordionItemStrapProps,
  AccordionHeader as AccordionHeaderStrap,
  AccordionHeaderProps as AccordionHeaderStrapProps,
  AccordionBody as AccordionBodyStrap,
  AccordionBodyProps as AccordionBodyStrapProps
} from 'reactstrap';

interface AccordionProps extends AccordionStrapProps {
}

export function Accordion(props: Readonly<AccordionProps>) {
  return (
    <AccordionStrap {...props} />
  )
}

interface AccordionItemProps extends AccordionItemStrapProps {
}

export function AccordionItem(props: Readonly<AccordionItemProps>) {
  return (
    <AccordionItemStrap {...props} />
  )
}

interface AccordionHeaderProps extends AccordionHeaderStrapProps {
}

export function AccordionHeader(props: Readonly<AccordionHeaderProps>) {
  return (
    <AccordionHeaderStrap {...props} />
  )
}

interface AccordionBodyProps extends AccordionBodyStrapProps {
}

export function AccordionBody(props: Readonly<AccordionBodyProps>) {
  return (
    <AccordionBodyStrap {...props} />
  )
}