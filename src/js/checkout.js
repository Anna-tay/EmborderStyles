import formDetails from './checkoutDetails.mjs';
import renderCartContents from './cartDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// building page info
formDetails()
// getting cart details
renderCartContents()

