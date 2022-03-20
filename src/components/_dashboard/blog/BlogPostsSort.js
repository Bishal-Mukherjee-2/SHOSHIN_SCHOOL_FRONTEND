import { useState } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
// material
import { MenuItem, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array
  //   onSort: PropTypes.func
};

export default function BlogPostsSort({ options, setSelected }) {
  const [selectedOption, setSelectedOption] = useState(options && options[0].value);
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedDropDown = options.find(({ value }) => value === selectedValue);
    // console.log(selectedCourse);
    setSelectedOption(selectedDropDown.value);
    setSelected(selectedDropDown.optionId);
  };
  return (
    <TextField select size="small" value={selectedOption} onChange={handleChange}>
      {options &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {sentenceCase(option.label)}
          </MenuItem>
        ))}
    </TextField>
  );
}
