import React from 'react'
import { useDispatch} from 'react-redux'
import {  openDialog } from '../../../slices/dialogSlice'
import CardModal from './CardModal';


export default function useCardModal() {
const dispatch = useDispatch();
  const handleAddToCartModal = (cardData, menuCategoryId) => {
        dispatch(openDialog({
            isNoContentPadding: true, content: <CardModal {...{ cardData }} />

        }))
    }
    return { handleAddToCartModal }
}


