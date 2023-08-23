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
  onMouseEnter,
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
        onMouseEnter={onMouseEnter}
        primary={`${quantity} ${itemName}`}
        secondary={`${set} #${collectorNumber}`}
        sx={{ cursor: 'pointer' }}
      />
    </ListItem>
  )
}

export default BuylistItem
