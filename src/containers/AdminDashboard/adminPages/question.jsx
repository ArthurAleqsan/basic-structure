import React, { useState } from 'react';
import SelectCategory from './selectCategory';
import CreateQuestion from './createQuestion';


const Questions = () => {
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category' isRequired={true} setCategory={setCategory} />
            )}
            {selectedCategory && (
                <CreateQuestion  selectedCategory={selectedCategory} />
            )}
        </div>
    )
}

export default Questions;