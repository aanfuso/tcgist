import {
  Link,
  ListItem,
  ListItemText,
} from '@mui/material'

const OfferLink = ({itemName, buyerName, buyerPhone }) => {
  const greeting = `Hi ${buyerName}, I have a ${itemName} for sale.`

  return (
    <Link
      href={`https://wa.me/${buyerPhone}?text=${greeting}%0A`}
      target="_blank"
      underline="hover"
    >
      Offer
    </Link>
  )
}

const BuylistItem = ({
  item: {
    collectorNumber,
    name: itemName,
    quantity,
    set,
  },
  buyer: {
    name: buyerName,
    phone: buyerPhone,
  },
}) => {

  return (
    <ListItem
      dense
      secondaryAction = {
        <div className='quantity'>
          <span>
            <OfferLink
              itemName={itemName}
              buyerName={buyerName}
              buyerPhone={buyerPhone}
            />
          </span>
        </div>
      }
    >
      <ListItemText
        primary={`${quantity} ${itemName}`}
        secondary={`${set} #${collectorNumber}`}
      />
    </ListItem>
  )
}

export default BuylistItem
