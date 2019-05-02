import React, { useState } from 'react';

import SelectCategory from './selectCategory';
import Announcements from './../announcements/announcements';

const Answers = () => {
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category'  setCategory={setCategory} />
            )}
            {selectedCategory && (
                <Announcements selectedCategory = {selectedCategory}/>
            )}
        </div>
    )
}
export default Answers;