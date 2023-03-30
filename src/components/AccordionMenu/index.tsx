import React, {
  ReactNode,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import ChevronBtn from '@/components/IconButtons/ChevronBtn'
import styles from '@/components/AccordionMenu/AccordionMenu.module.scss'

type PropsType = {
  children: ReactNode | ReactNode[]
  className?: string
}

interface PropsWithDataStateType extends PropsType {
  open?: boolean
  handleOpen?: () => void
}

export const Accordion = ({ children, className }: PropsType) => {
  return (
    <div className={clsx(styles.accordionContainer, className)}>{children}</div>
  )
}

Accordion.Header = ({
  children,
  className,
  handleOpen,
  open,
}: PropsWithDataStateType) => {

  return (
    <div
      data-state={open ? 'open' : 'closed'}
      className={clsx(styles.accordionHeader, className)}
    >
      {children}
      <ChevronBtn className={styles.chevronBtn} onClick={handleOpen} />
    </div>
  )
}

Accordion.Item = ({ children, className }: PropsType) => {
  const [open, setOpen] = useState(true)
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div className={clsx(styles.accordionItem, className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as JSX.Element, { open, handleOpen })
        }
        return child
      })}
    </div>
  )
}

Accordion.Content = ({ children, className, open }: PropsWithDataStateType) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const animationHeight = contentRef?.current?.clientHeight

  return (
    <div
      data-state={open ? 'open' : 'closed'}
      style={
        {'--h': animationHeight && `${animationHeight}px`} as React.CSSProperties
      }
      ref={contentRef}
      className={clsx(styles.accordionContent, className)}
    >
      {children}
    </div>
  )
}
