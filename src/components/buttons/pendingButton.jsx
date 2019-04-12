import React from 'react';
import { Button } from '../componentsLib/simpleUiComponents';

const PendingButton = () => {
    return (
        <div>
            <Button className='btn pending-btn' iconImagePath='/assets/images/icons/add-friend.svg' >
                Sent
            </Button>
        </div>
    )
}
export default PendingButton;