# Change Log

## v1.0.5

- Bugfix - New way to init app in so it can be inactive on cart page.
- Better error reporting for JSON parsing errors when parsing product data.

## v1.0.4

- Majorfix - Product data is now fetched via API, and not Shopify liquid templating.

## v1.0.3

- Bugfix - Switch product size banner values in `ImageList` component from "print" to "display".

## v1.0.2

- Bugfix - Add to Cart issue has been resolved.

## v1.0.1

- `finally` is no longer used, so as to drop browser compatibility issues
- New component, utilities, actions, and reducers for calculating render sizes and cropping
- Fixed Add-To-Cart bug when in use a second time
- Better debugging
- Redux action breadcrumbs for Sentry error reporting
- Unit tests added for utilities
- Gallery resets to edit mode when the modal is closed

## v1.0.0

- Sentry.io error logging and tracking added.
- Cookies have been disabled in production.

## v0.2.0

- Tiles properly will overflow half of the last visible tile if scrolling is active.
- Update Filestack Upload screen.
  - Remove smooth scrolling, as with Filestacks markup, it becomes far too buggy.
  - Redo styling to keep things visible during uploading process.

## v0.1.3

- Update Filestack Upload screen.

  - Fix margin issues when upload list adds another `div` when uploading.

- Update FrameSelector to apply a width that will hide half of the 6th frame on mobile. (for added scroll hint).

## v0.1.2

- Update Filestack Upload screen.

  - Change 'Upload' to 'Start Creating'.
  - Fix styles to best position everything and respect scrolling.

- Update Edit view to better handle larger screens.
- Add scroll hinting.
- Fixed Image loading animation.
- Crop Box no longer shows while the artboard loads an image.
- Edits respect aspect ratio before native scaled values when creating final edit.
- scrolling optimized for touch.
