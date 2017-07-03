import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Title

} from './mobile.theme';

function TitleBlockMobile({ title }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
}

TitleBlockMobile.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

TitleBlockMobile.defaultProps = {
  title: 'testing',
  subtitle: '1 2 3',
};

export default TitleBlockMobile;
