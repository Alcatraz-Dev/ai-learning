// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://021e7c56bdffcfc41f7d06e1160ace19@o4507974120833024.ingest.de.sentry.io/4507974127910992",

    // Add optional integrations for additional features
    integrations: [
        Sentry.replayIntegration({
            blockAllMedia: false,
            maskAllText: false,
        }),

        Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:
            colorScheme: "dark",
        }),
    ],


    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
});
