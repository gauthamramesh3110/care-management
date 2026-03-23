import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
  },
};

let _msalApp: ConfidentialClientApplication | null = null;

export function getMsalApp(): ConfidentialClientApplication {
  if (!_msalApp) {
    _msalApp = new ConfidentialClientApplication(msalConfig);
  }
  return _msalApp;
}
