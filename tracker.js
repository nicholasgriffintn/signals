const FingerprintJS = require('@fingerprintjs/fingerprintjs');
const { sum } = require('./utils/math');

const fpPromise = FingerprintJS.load();

(async (window) => {
  const {
    navigator: { language },
    location: {
      hash,
      host,
      hostname,
      href,
      origin,
      port,
      protocol,
      search,
      pathname,
    },
    document,
    history,
  } = window;

  const fp = await fpPromise;
  const fpResult = await fp.get();
  const fingerprint = fpResult.visitorId;

  function SIGNALS_SAT_DATALAYER(endpoint, siteId, sessionId, userId) {
    const event = {};
    event.endpoint = endpoint || undefined;
    event.siteId = siteId || undefined;
    event.sessionId = sessionId || undefined;
    event.userId = userId || undefined;
    event.latestPageViewEvent = undefined;
    event.current = {
      hash,
      host,
      hostname,
      href,
      origin,
      port,
      protocol,
      search,
      pathname,
    };
    event.track = (
      path,
      type = 'pageView',
      category = '',
      action = '',
      label = '',
      value = ''
    ) => {
      fetch(
        `${event.endpoint}${
          type !== 'init' ? `/${event.sessionId}/${type}/` : '/'
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: event.sessionId,
            userId: event.userId,
            type: type,
            element: {
              ...path,
              title: document.title,
            },
            category,
            action,
            label,
            value,
            language: language,
            seed: event.siteId,
            referrer: document.referrer,
            fingerprint: fingerprint,
            scrap: fpResult.components
              ? {
                  audio: fpResult.components.audio || {},
                  colorDepth: fpResult.components.colorDepth || {},
                  colorGamut: fpResult.components.colorGamut || {},
                  contrast: fpResult.components.contrast || {},
                  cookiesEnabled: fpResult.components.cookiesEnabled || {},
                  cpuClass: fpResult.components.cpuClass || {},
                  deviceMemory: fpResult.components.deviceMemory || {},
                  fonts: fpResult.components.fonts || {},
                  fontPreferences: fpResult.components.fontPreferences || {},
                  hardwareConcurrency:
                    fpResult.components.hardwareConcurrency || {},
                  hdr: fpResult.components.hdr || {},
                  indexedDB: fpResult.components.indexedDB || {},
                  invertedColors: fpResult.components.invertedColors || {},
                  languages: fpResult.components.languages || {},
                  localStorage: fpResult.components.localStorage || {},
                  monochrome: fpResult.components.monochrome || {},
                  openDatabase: fpResult.components.openDatabase || {},
                  osCpu: fpResult.components.osCpu || {},
                  platform: fpResult.components.platform || {},
                  plugins: fpResult.components.plugins || {},
                  reducedMotion: fpResult.components.reducedMotion || {},
                  screenFrame: fpResult.components.screenFrame || {},
                  screenResolution: fpResult.components.screenResolution || {},
                  sessionStorage: fpResult.components.sessionStorage || {},
                  timezone: fpResult.components.timezone || {},
                  touchSupport: fpResult.components.touchSupport || {},
                  vendor: fpResult.components.vendor || {},
                }
              : [],
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          event.sessionId = res.sessionID;
          event.userId = res.userId;
          event.siteId = res.siteSiteId;

          if (type === 'pageView') {
            event.latestPageViewEvent = res.eventId;
          }

          // Send the first pageview on init
          if (type === 'init') {
            event.track(path);
          }

          return res;
        })
        .catch((error) => {
          console.error(error);

          throw error;
        });
    };
    event.initializeTimings = (timings = []) => {
      let start = performance.now();

      return () => {
        if (document.visibilityState === 'hidden') {
          // Push current duration in timings
          timings.push(performance.now() - start);

          const blob = new Blob(
            [
              JSON.stringify({
                sessionId: event.sessionId,
                userId: event.userId,
                siteId: event.siteId,
                duration: sum(timings),
              }),
            ],
            { type: 'application/json; charset=UTF-8' }
          );

          if (
            event.sessionId &&
            event.latestPageViewEvent &&
            navigator.sendBeacon
          ) {
            navigator.sendBeacon(
              `${event.endpoint}/${event.sessionId}/event/${event.latestPageViewEvent}/performance`,
              blob
            );
          }
        } else {
          start = performance.now();
        }
      };
    };
    event.handlePushState = () => {
      const pushState = history.pushState;

      return (...args) => {
        const [, , url] = args;

        if (url !== current.pathname) {
          current.pathname = url;
          event.track(url);
        }

        return pushState.apply(history, args);
      };
    };
    event.pushEvent = function (data) {
      console.log(`pushing event to ${event.siteId}: ${JSON.stringify(data)}`);

      event.track(
        event.current,
        'event',
        data.category || '',
        data.action || '',
        data.label || '',
        data.value || '',
        data
      );
    };
    return event;
  }

  // Check Script Exists
  const script = document.querySelector('script[signals-id]');

  if (!script) return false;

  const websiteSeed = script.getAttribute('signals-id');
  const sessionSeed = script.getAttribute('signals-session-id');
  const userSeed = script.getAttribute('signals-user-id');
  const satURL = script
    .getAttribute('src')
    .replace('/sat.js', `/${websiteSeed}/analytics/sessions`);

  const SIGNALS_SAT = SIGNALS_SAT_DATALAYER(
    satURL,
    websiteSeed,
    sessionSeed,
    userSeed
  );

  // Auto track the page view on load
  SIGNALS_SAT.track(
    {
      hash,
      host,
      hostname,
      href,
      origin,
      port,
      protocol,
      search,
      pathname,
    },
    'init'
  );

  // Start performance tracking on visibility change
  const sendTiming = SIGNALS_SAT.initializeTimings();
  document.addEventListener('visibilitychange', sendTiming);

  // Make pushState use our function
  history.pushState = SIGNALS_SAT.handlePushState();

  // Make functions available to window
  window.SIGNALS_SAT_DATALAYER = SIGNALS_SAT_DATALAYER;
  window.SIGNALS_SAT = SIGNALS_SAT;
})(window);
