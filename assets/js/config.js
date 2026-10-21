/* 66221.com site configuration.
   Payment links: paste a PayPal / Stripe Payment Link / Buy Me a Coffee URL to switch the
   Support page buttons from "pledge" mode to instant checkout. Leave blank to keep pledges. */
window.SITE = {
  name: "66221 Living",
  domain: "66221.com",
  ownerContactUrl: "https://web.works/contact",
  adsenseClient: "ca-pub-6620975821265271",
  payments: {
    paypal: "",        // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    stripe: "",        // e.g. https://buy.stripe.com/XXXX
    buymeacoffee: ""   // e.g. https://www.buymeacoffee.com/yourname
  },
  /* Form relay key (encoded). Keep it encoded — never paste a plain address anywhere on the site. */
  _k: ["MWFza3Jvd2Jldw==", "bW9jLmxpYW1n"]
};
