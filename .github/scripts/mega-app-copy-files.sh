#!/bin/bash

cd build-system-tests
if [ "$BUILD_TOOL" == 'cra' ]; then
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    if [ "$LANGUAGE" == 'js' ]; then
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.js
    else
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx
        if [ "$FRAMEWORK_VERSION" == '16' ]; then
            # We have to customize the index.tsx file for React 16 because the render API changed since React 18.
            # See more: https://legacy.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
            cp templates/components/react/cra/index-react-${FRAMEWORK_VERSION}.js mega-apps/${MEGA_APP_NAME}/src/index.tsx
        fi
    fi
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    mkdir mega-apps/${MEGA_APP_NAME}/data
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/data/aws-exports.js
    cp templates/components/react/next/App.js mega-apps/${MEGA_APP_NAME}/pages/index.tsx
    if [ "$BUILD_TOOL_VERSION" == '11' ]; then
        # We have to customize the package.json and tsconfig.json for Next.js 11,
        # because create-next-app only creates the app with the latest version
        cp templates/components/react/next/template-package-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/package.json
        cp templates/components/react/next/template-tsconfig-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    fi
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx
    cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
    cp templates/components/react/vite/template-tsconfig.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    cp templates/components/react/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts
fi

if [ "$BUILD_TOOL" == 'cli' ]; then
    cp templates/components/angular/angular.json mega-apps/${MEGA_APP_NAME}/angular.json
    cp templates/components/angular/app.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts
    cp templates/components/angular/app.module.ts mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts
    cp templates/components/angular/polyfills.ts mega-apps/${MEGA_APP_NAME}/src
    cp templates/components/angular/tsconfig.app.json mega-apps/${MEGA_APP_NAME}/tsconfig.app.json
fi