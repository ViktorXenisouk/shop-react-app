import React from 'react';
import CheckboxWithLabel from '../../../../../../UI/CheckboxWithLabel';

type Props = {
  isSelected: boolean;
  label: string;
  addOrRemoveTag: (tag: string) => void;
  value: string;
};

const CustomRadio : React.FC<Props> = ({ label, value,isSelected,addOrRemoveTag }) => {

  const handleChange = () => {
    addOrRemoveTag(value)
  };

  return (
    <CheckboxWithLabel onClick={handleChange} isSelected={isSelected} label={label}/>
  )
}

export default CustomRadio