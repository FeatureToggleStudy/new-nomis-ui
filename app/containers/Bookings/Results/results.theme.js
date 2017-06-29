import styled from 'styled-components';
import colours from 'theme/colours';
import B from 'components/Button';
import { Link } from 'react-router';

import { responsiveCols, fixedCols } from 'components/CommonTheme/responsiveColumns';

export const SearchQueryView = styled.div`
  height: 100px;
  background: ${colours.filterBlocks.background};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchQueryItem = styled.div`
  margin: 15px;
  color: ${colours.filterBlocks.text.title}
  display: flex;
  flex-direction: column;
  align-items: baseline;
  .title {
    flex-grow: 1;
  }
  .current {
    color: ${colours.filterBlocks.text.current}
    font-size: 26px;
  }
`;

export const Button = styled(B)`
  width: 138px;
  height: 60px;
  padding: 0px;
  margin: 20px;
`;

export const BookingList = styled.div`
  ${''/* display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;
  grid-auto-rows: minmax(100px, auto); */}

`;

export const BookingGrid = styled.div`
  ${''/* display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;
  grid-auto-rows: minmax(100px, auto); */}
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;

`;

export const ListDetailItem = styled(Link)`
  align-items: flex-end;
  border-top: ${colours.bookings.searchResults.borderColour} solid 1px;
  cursor: pointer;
  display: flex;
  height: 130px;
  padding-top: 22px;
  padding-bottom: 17px;

  &:last-of-type {
    border-bottom: ${colours.bookings.searchResults.borderColour} solid 1px;
    height: 131px;
  }

  div {
    &:not(:first-child) {
      margin-left: calc( 100% * 15 / 1170 );
    }
    &:not(:last-child) {
      margin-right: calc( 100% * 15 / 1170 );
    }
  }

  &:hover {
    background: ${colours.filterBlocks.background};
    border-color: ${colours.filterBlocks.background};
    margin: 0 -15px;
    padding-left: 15px;
    padding-right: 15px;
    width: calc(100% + 30px);
  }

  &:hover+div {
    border: none;
  }
`;


export const ListDetailImage = styled.div`
  width: ${fixedCols(1)};
  width: 70px;
  height: 90px;

`;

export const Name = styled.div`
  font-weight: bold;
  width: ${responsiveCols(5)};
`;

export const ID = styled.div`
  flex-grow: 1;
`;

export const Location = styled.div`
  width: ${responsiveCols(2)};
  text-align: right;
`;

export const GridDetailItem = styled(Link)`
  position: relative;
  align-items: flex-end;
  cursor: pointer;
  display: flex;
  /*height: 482px;*/
  width: 270px;

  float: left;
  margin-right: 17px;
  margin-bottom: 17px;


  display: inline-flex;
  width: 220px;
  flex-direction: column;
  background: ${colours.bookings.results.itemBackground};

  &:hover {
    background: ${colours.filterBlocks.background};
  }

  @media (min-width: 1183px) {
    &:nth-child(5n) {
      margin-right: 0px;
    }
  }

  @media (min-width: 946px) and (max-width: 1182px) {
    &:nth-child(4n) {
      margin-right: 0px;
    }
  }

  @media (min-width: 768px) and (max-width: 945px) {
    &:nth-child(3n) {
      margin-right: 0px;
    }
  }

  @media (max-width: 767px) {
    width: calc(50% - 35px);

    margin-right: 0px;
    margin-top: 22px;
    margin-bottom: 22px;

    &:nth-child(2n) {
      margin-right: 20px;
      margin-left: 15px;
    }
    &:nth-child(2n - 1) {
      margin-right: 15px;
      margin-left: 20px;
    }
  }


`;

export const GridDetailImage = styled.div`


  width: 100%;
  height: 70%;

  height: 275px;

  @media (max-width: 767px) {
    height: 55.5vw;
  }

`;

export const GridDetailInfo = styled.div`

  width: 100%;
  min-height: 30%;
  padding-top: 17px;

  min-height: 120px;
  padding: 17px 14px;

  @media (max-width: 767px) {
    padding: 3vw 2vw;
  }

`;

export const GridName = styled.div`
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-size: 22px;

  text-align: left;
  font-size: 19px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    font-size: 3.5vw;
  }
`;

export const GridID = styled.div`
  flex-grow: 1;
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;

  text-align: left;
  font-size: 19px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    font-size: 3vw;
  }
`;

export const GridLocation = styled.div`
  flex-grow: 1;
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 13px;

  text-align: left;
  font-size: 19px;
  margin-bottom: 0px;

  @media (max-width: 767px) {
    font-size: 3vw;
  }
`;
