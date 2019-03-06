import React from 'react'
import styled from 'styled-components'
import { FOCUS_COLOUR, LINK_HOVER_COLOUR, LINK_COLOUR } from 'govuk-colours'
import { FOCUS_WIDTH, BREAKPOINTS } from '@govuk-react/constants'
import { spacing, typography } from '@govuk-react/lib'
import PrintIcon from './images/icon-print.png'
import { linkOnClick } from '../../../helpers'

const StyledPrintLink = styled.div`
  display: none;

  @media print, (min-width: ${BREAKPOINTS.DESKTOP}) {
    display: inline-block;
    ${props => (props.bottom ? spacing.responsive({ size: 6, property: 'margin', direction: ['top'] }) : null)}
    text-decoration: underline;
    cursor: pointer;
    background: url(${PrintIcon}) no-repeat 0 50%;
    padding: 0.5em 0 0.5em 28px;

    &:focus {
      outline: ${FOCUS_WIDTH} solid ${FOCUS_COLOUR};
    }

    span {
      ${typography.font({ size: 16 })};
      text-decoration: 'underline';
      color: ${LINK_COLOUR};

      &:hover {
        color: ${LINK_HOVER_COLOUR};
      }
    }
  }
`

const PrintLink = () => (
  <StyledPrintLink {...linkOnClick(() => window.print())}>
    <span>Print this page</span>
  </StyledPrintLink>
)

export default PrintLink