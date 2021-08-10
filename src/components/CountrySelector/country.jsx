import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, NativeSelect, makeStyles }
  from '@material-ui/core';
import styled from 'styled-components'


Country.propTypes = {
  className: PropTypes.string
};
Country.defaultProps = {
  className: '',
};

const useStyles = makeStyles((theme) => ({
  container: {
  }
}))

function Country(props) {
  const { className, value, handleOnChange, countries } = props;
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <FormControl>
        <InputLabel htmlFor="country-selector" shrink> Country </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleOnChange}
          inputProps={{
            name: 'country',
            id: 'country-selector',
          }}
        >
          {
            countries.map((itemCountry) => {
              return <option value={itemCountry.ISO2.toLowerCase()}>{itemCountry.Country}</option>
            })
          }
        </NativeSelect >
        <FormHelperText>Choose country</FormHelperText>
      </FormControl>
    </div>
  );
}

const StyledCountry = styled(Country)`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`
export default StyledCountry
