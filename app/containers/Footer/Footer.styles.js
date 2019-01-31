import styled from 'react-emotion'
import { SPACING, LINE_HEIGHT, FONT_SIZE, MEDIA_QUERIES, GUTTER_HALF, NTA_LIGHT } from '@govuk-react/constants'
import { Link } from 'react-router-dom'
import { FOOTER_BACKGROUND, FOOTER_TEXT, FOOTER_BORDER_TOP } from 'govuk-colours'

// $govuk-footer-background: $govuk-canvas-background-colour;
// $govuk-footer-border-top: #a1acb2;
// $govuk-footer-border: govuk-colour("grey-2");
// $govuk-footer-text: #454a4c;
// $govuk-footer-link: $govuk-footer-text;
// $govuk-footer-link-hover: #171819;

// // Based on the govuk-crest-2x.png image dimensions.
// $govuk-footer-crest-image-width-2x: 250px;
// $govuk-footer-crest-image-height-2x: 204px;
// // Half the 2x image so that it fits the regular 1x size.
// $govuk-footer-crest-image-width: ($govuk-footer-crest-image-width-2x / 2);
// $govuk-footer-crest-image-height: ($govuk-footer-crest-image-height-2x / 2);

export const Footer = styled('footer')`
  /* @include govuk-font($size: 16); */
  /* @include govuk-responsive-padding(7, 'top');
  @include govuk-responsive-padding(5, 'bottom'); */
  font-family: ${NTA_LIGHT};
  font-size: ${FONT_SIZE.SIZE_14};
  line-height: ${LINE_HEIGHT.SIZE_14};
  ${MEDIA_QUERIES.LARGESCREEN} {
    font-size: ${FONT_SIZE.SIZE_16};
    line-height: ${LINE_HEIGHT.SIZE_16};
  }

  border-top: 1px solid ${FOOTER_BORDER_TOP};
  color: ${FOOTER_TEXT};
  background: ${FOOTER_BACKGROUND};
`

export const Meta = styled('div')`
  display: flex;
  margin-right: -${GUTTER_HALF};
  margin-left: -${GUTTER_HALF};
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
`

export const MetaItem = styled('div')`
  margin-right: ${GUTTER_HALF};
  margin-bottom: ${SPACING.SCALE_5};
  margin-left: ${GUTTER_HALF};
  ${props =>
    props.grow && {
      flex: 1,
    }}
`

// @media (min-width: ${BREAKPOINTS.TABLET}) {
//   font-size: ${FONT_SIZE.SIZE_19};
// }

// .govuk-footer__meta {
//   display: flex; // Support: Flexbox
//   margin-right: -$govuk-gutter-half;
//   margin-left: -$govuk-gutter-half;
//   flex-wrap: wrap; // Support: Flexbox
//   align-items: flex-end; // Support: Flexbox
//   justify-content: center; // Support: Flexbox
// }

// .govuk-footer__meta-item {
//   margin-right: $govuk-gutter-half;
//   margin-bottom: govuk-spacing(5);
//   margin-left: $govuk-gutter-half;
// }

// .govuk-footer__meta-item--grow {
//   flex: 1; // Support: Flexbox
//   @include mq ($until: tablet) {
//     flex-basis: 320px; // Support: Flexbox
//   }
// }
/*
// https://github.com/alphagov/govuk-frontend/blob/master/src/components/footer/_footer.scss

@import "../../settings/all";
@import "../../tools/all";
@import "../../helpers/all";

@import "../../helpers/typography";

@include govuk-exports("govuk/component/footer") {

  $govuk-footer-background: $govuk-canvas-background-colour;
  $govuk-footer-border-top: #a1acb2;
  $govuk-footer-border: govuk-colour("grey-2");
  $govuk-footer-text: #454a4c;
  $govuk-footer-link: $govuk-footer-text;
  $govuk-footer-link-hover: #171819;

  // Based on the govuk-crest-2x.png image dimensions.
  $govuk-footer-crest-image-width-2x: 250px;
  $govuk-footer-crest-image-height-2x: 204px;
  // Half the 2x image so that it fits the regular 1x size.
  $govuk-footer-crest-image-width: ($govuk-footer-crest-image-width-2x / 2);
  $govuk-footer-crest-image-height: ($govuk-footer-crest-image-height-2x / 2);

  .govuk-footer {
    @include govuk-font($size: 16);
    @include govuk-responsive-padding(7, "top");
    @include govuk-responsive-padding(5, "bottom");

    border-top: 1px solid $govuk-footer-border-top;
    color: $govuk-footer-text;
    background: $govuk-footer-background;
  }

  .govuk-footer__link {
    @include govuk-focusable-fill;

    &:link,
    &:visited {
      color: $govuk-footer-link;
    }

    &:hover,
    &:active {
      color: $govuk-footer-link-hover;
    }

    // When focussed, the text colour needs to be darker to ensure that colour
    // contrast is still acceptable
    &:focus {
      color: $govuk-focus-text-colour;
    }

    // alphagov/govuk_template includes a specific a:link:focus selector
    // designed to make unvisited links a slightly darker blue when focussed, so
    // we need to override the text colour for that combination of selectors.
    @include govuk-compatibility(govuk_template) {
      &:link:focus {
        @include govuk-text-colour;
      }
    }
  }

  .govuk-footer__section-break {
    margin: 0; // Reset `<hr>` default margins
    @include govuk-responsive-margin(8, "bottom");
    border: 0; // Reset `<hr>` default borders
    border-bottom: 1px solid $govuk-footer-border;
  }

  .govuk-footer__meta {
    display: flex; // Support: Flexbox
    margin-right: -$govuk-gutter-half;
    margin-left: -$govuk-gutter-half;
    flex-wrap: wrap; // Support: Flexbox
    align-items: flex-end; // Support: Flexbox
    justify-content: center; // Support: Flexbox
  }

  .govuk-footer__meta-item {
    margin-right: $govuk-gutter-half;
    margin-bottom: govuk-spacing(5);
    margin-left: $govuk-gutter-half;
  }

  .govuk-footer__meta-item--grow {
    flex: 1; // Support: Flexbox
    @include mq ($until: tablet) {
      flex-basis: 320px; // Support: Flexbox
    }
  }

  .govuk-footer__licence-logo {
    display: inline-block;
    margin-right: govuk-spacing(2);
    @include mq ($until: desktop) {
      margin-bottom: govuk-spacing(3);
    }
    vertical-align: top;
  }

  .govuk-footer__licence-description {
    display: inline-block;
  }

  .govuk-footer__copyright-logo {
    display: inline-block;
    min-width: $govuk-footer-crest-image-width;
    padding-top: ($govuk-footer-crest-image-height + govuk-spacing(2));
    background-image: govuk-image-url("govuk-crest.png");
    @include govuk-device-pixel-ratio {
      background-image: govuk-image-url("govuk-crest-2x.png");
    }
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: $govuk-footer-crest-image-width $govuk-footer-crest-image-height;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
  }

  .govuk-footer__inline-list {
    margin-top: 0;
    margin-bottom: govuk-spacing(3);
    padding: 0;
  }

  .govuk-footer__meta-custom {
    margin-bottom: govuk-spacing(4);
  }

  .govuk-footer__inline-list-item {
    display: inline-block;
    margin-right: govuk-spacing(3);
    margin-bottom: govuk-spacing(1);
  }

  .govuk-footer__heading {
    @include govuk-responsive-margin(7, "bottom");
    padding-bottom: govuk-spacing(4);
    @include mq ($until: tablet) {
      padding-bottom: govuk-spacing(2);
    }
    border-bottom: 1px solid $govuk-footer-border;
  }

  .govuk-footer__navigation {
    display: flex; // Support: Flexbox
    margin-right: -$govuk-gutter-half;
    margin-left: -$govuk-gutter-half;
    flex-wrap: wrap; // Support: Flexbox
  }

  .govuk-footer__section {
    display: inline-block;
    margin-right: $govuk-gutter-half;
    margin-bottom: $govuk-gutter;
    margin-left: $govuk-gutter-half;
    vertical-align: top;
    // Ensure columns take up equal width (typically one-half:one-half)
    flex-grow: 1; // Support: Flexbox
    flex-shrink: 1; // Support: Flexbox
    @include mq ($until: desktop) {
      // Make sure columns do not drop below 200px in width
      // Will typically result in wrapping, and end up in a single column on smaller screens.
      flex-basis: 200px; // Support: Flexbox
    }
  }

  // Sections two-third:one-third on desktop
  @include mq ($from: desktop) {
    .govuk-footer__section:first-child {
      flex-grow: 2; // Support: Flexbox
    }
  }

  .govuk-footer__list {
    margin: 0;
    padding: 0;
    list-style: none;
    column-gap: $govuk-gutter; // Support: Columns
  }

  @include mq ($from: desktop) {
    .govuk-footer__list--columns-2 {
      column-count: 2; // Support: Columns
    }

    .govuk-footer__list--columns-3 {
      column-count: 3; // Support: Columns
    }
  }

  .govuk-footer__list-item {
    @include govuk-responsive-margin(4, "bottom");
  }

  .govuk-footer__list-item:last-child {
    margin-bottom: 0;
  }
}

*/
