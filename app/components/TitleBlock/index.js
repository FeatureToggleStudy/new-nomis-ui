import React from 'react';
import PropTypes from 'prop-types';

import {
  LeftWrapper,
  Wrapper,
  Title

} from './titleblock.theme';

function TitleBlock({ title }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
}

function LeftTitleBlock({ title }) {
  return (
    <LeftWrapper>
      <Title>{title}</Title>
    </LeftWrapper>
  );
}

TitleBlock.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

TitleBlock.defaultProps = {
  title: 'testing',
  subtitle: '1 2 3',
};

export default TitleBlock;
