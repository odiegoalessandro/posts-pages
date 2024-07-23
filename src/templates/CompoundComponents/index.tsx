import React, { Children, cloneElement, ReactElement, ReactNode } from "react";

interface ListProps {
  children: ReactNode
}

interface ListItemProps {
  children: ReactNode
  style?: React.CSSProperties
}

const ListItem = ({ children, style }: ListItemProps) => (
  <li style={style}>
    {children}
  </li>
)

const List = ({ children }: ListProps) => {
  
  return (
    <ul>
       {
        Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return cloneElement(child as ReactElement, {
              style: { backgroundColor: index % 2 === 0 ? "red" : "blue" }
            });
          }
          return child;
        })
      }
    </ul>
  )
} 


export default function CompoundComponents(){
  return (
    <List>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
    </List>
  )
}