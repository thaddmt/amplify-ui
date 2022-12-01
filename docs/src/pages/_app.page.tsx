import * as React from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Amplify } from 'aws-amplify';
import { ThemeProvider, ColorMode, defaultTheme } from '@aws-amplify/ui-react';

import { configure, trackPageVisit } from '@/utils/track';
import { IS_PROD_STAGE } from '@/utils/stage';
import { Header } from '@/components/Layout/Header';
import { baseTheme } from '../theme';

import { Head } from './Head';

import Prism from 'prism-react-renderer/prism';

globalThis.Prism = Prism;

require('prismjs/components/prism-dart');

import '../styles/index.scss';
import classNames from 'classnames';
import { GlobalNav, NavMenuItem } from '@/components/Layout/GlobalNav';
import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS,
} from '@/data/globalnav';

Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id:
    'us-east-1:d3a6f808-d4e3-4fb5-b3dd-6e3223747470',
  aws_cognito_region: 'us-east-1',
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: {
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: [],
  aws_mobile_analytics_app_id: '9e49fe1ad13c456fbe5cf0bd86199daf',
  aws_mobile_analytics_app_region: 'us-east-1',
  Notifications: {
    InAppMessaging: {
      AWSPinpoint: {
        appId: '9e49fe1ad13c456fbe5cf0bd86199daf',
        region: 'us-east-1',
      },
    },
  },
});

if (typeof window === 'undefined') {
  // suppress useLayoutEffect warnings when running outside a browser
  // See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=4150784#gistcomment-4150784
  // @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
  React.useLayoutEffect = () => {};
} else {
  console.log(`
  _____           _ _ ___        _____ _____ 
 |  _  |_____ ___| |_|  _|_ _   |  |  |     |
 |     |     | . | | |  _| | |  |  |  |-   -|
 |__|__|_|_|_|  _|_|_|_| |_  |  |_____|_____|
             |_|         |___|               

  ✨ you can explore the Amplify UI theme object by typing \`theme\` in the console.
 `);
  window['theme'] = defaultTheme;
}

function MyApp({ Component, pageProps }) {
  const [expanded, setExpanded] = React.useState(false);

  const {
    pathname,
    query: { platform = 'react' },
  } = useRouter();

  const isHomepage = pathname === '/' || pathname === '/[platform]';

  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const handleColorModeChange = (colorMode: ColorMode) => {
    setColorMode(colorMode);
    if (colorMode !== 'system') {
      localStorage.setItem('colorMode', colorMode);
    } else {
      localStorage.removeItem('colorMode');
    }
    // Algolia search renders in a Portal so we need to do this
    document.documentElement.setAttribute('data-amplify-color-mode', colorMode);
  };

  React.useEffect(() => {
    const colorModePreference = localStorage.getItem('colorMode') as ColorMode;
    if (colorModePreference) {
      setColorMode(colorModePreference);
    }
    document.documentElement.setAttribute(
      'data-amplify-color-mode',
      colorModePreference || 'system'
    );
  }, []);

  React.useEffect(() => {
    if (IS_PROD_STAGE) {
      configure();
      trackPageVisit();
    }
  }, [pathname]); // only track page visit if path has changed

  return (
    <>
      <Head />

      <div className={isHomepage ? `docs-home` : ''}>
        <ThemeProvider theme={baseTheme} colorMode={colorMode}>
          {
            <GlobalNav
              rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
              leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
              socialLinks={SOCIAL_LINKS as NavMenuItem[]}
              currentSite="UI Library"
            />
          }
          <Header
            expanded={expanded}
            setExpanded={setExpanded}
            colorMode={colorMode}
            setColorMode={handleColorModeChange}
            platform={platform}
          />
          <main className="docs-main">
            <div
              className={classNames(
                'docs-sidebar-spacer',
                expanded ? 'expanded' : 'collapsed'
              )}
            />

            <Component
              {...pageProps}
              setExpanded={setExpanded}
              colorMode={colorMode}
            />
          </main>
        </ThemeProvider>
      </div>
      {IS_PROD_STAGE && (
        <>
          <Script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js" />
          <Script src="/scripts/shortbreadv2.js" />
        </>
      )}
    </>
  );
}

export default MyApp;
