import styled from 'styled-components';
import colours from 'theme/colours';
import desktop from 'theme/desktop';
import { media } from 'utils/style-utils';

export const FooterContainer = styled.div`
  display: none;
  
  ${media.desktop`display: block;`}
  
  position: absolute;
  bottom: 0;
  width: 100%;

  background: ${colours.footer.bg};
`;

export const FooterLinksContainer = styled.div`
  max-width: ${desktop.fixWidth}px;
  padding-top: 10px;
`;

export const FooterLink = styled.div`
  float: left;
  padding: 0px 19px;
  border-right: 1px solid ${colours.baseFont};
  height: 19px;
  cursor: pointer;

  &:last-child {
    border-right: 0px;
  }
  &:first-child {
    padding-left: 14px;
  }
`;

export const FooterSignature = styled.div`
  max-width: 1170px;
  clear: left;
  margin-top: 37px;
  padding-left: 14px;
  padding-bottom: 10px;
`;
