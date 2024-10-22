This project is a JavaScript rewrite of the [react-icon-cloud in TypeScript](https://github.com/teaguestockwell/react-icon-cloud) by Teague Stockwell.

[![license-shield]][license-url] [![linkedin-shield]][linkedin-url]  [![gh-shield]][gh-url]

[license-shield]: https://img.shields.io/github/license/teaguestockwell/react-icon-cloud.svg

[license-url]: https://github.com/sedar007/react-icon-cloud-js/blob/master/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555

[linkedin-url]: https://www.linkedin.com/in/adjy-sedar-desir/

[gh-shield]: https://img.shields.io/badge/-GitHub-black.svg?logo=github&colorB=555

[gh-url]: https://github.com/sedar007/react-icon-cloud-js

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sedar007/react-icon-cloud-js">
    <img src="https://user-images.githubusercontent.com/71202372/131417256-58058879-f14c-4c03-9bdf-03bd1c80f25d.gif" alt="Logo" width="80%" >
  </a>
 <p align="center">Credit: <a href="https://github.com/teaguestockwell/react-icon-cloud" target="_blank">Teague Stockwell</a>
</p>

  

## About
An interactive 3D tag cloud component for React that renders text, images, and simple icons into a interactive 3D tag cloud

- Built in support for rendering a cloud of [Simple Icons](https://github.com/simple-icons/simple-icons) with custom fallback color for poor contrast

- Lazy animation of the canvas (pause animation when off screen)

## Getting Started

```sh
npm i react-icon-cloud-js
```

## Dynamic icon slugs
```js
"use client";
import { createRoot } from 'react-dom/client';
import PropTypes from "prop-types";
import './index.css';
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Cloud } from "../src/renderers/Cloud";
import { fetchSimpleIcons } from "../src/utils/fetchSimpleIcons";
import { renderSimpleIcon } from "../src/renderers/SimpleIcon";

const cloudProps = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.04,
        minSpeed: 0.02,
    },
};

export default cloudProps;

export const renderCustomIcon = (icon, theme) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return (
        <div key={icon.slug}>
            {renderSimpleIcon({
                icon,
                bgHex,
                fallbackHex,
                minContrastRatio,
                size: 42,
            })}
        </div>
    );
};

export function IconCloud({ iconSlugs }) {
    const [data, setData] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;
        return Object.values(data.simpleIcons).map((icon) => {
            return renderCustomIcon(icon, theme || "light"); // Ne pas passer de clé ici
        });
    }, [data, theme]);

    return (
        <Cloud {...cloudProps}>
            <>{renderedIcons}</>
        </Cloud>
    );
}

IconCloud.propTypes = {
    iconSlugs: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
};

const App = () => {
    const slugs = [
        "typescript",
        "javascript",
        "dart",
        "java",
        "react",
        "flutter",
        "android",
        "html5",
        "css3",
        "amazonaws",
        "postgresql",
        "firebase",
        "nginx",
        "vercel",
        "jest",
        "cypress",
        "docker",
        "git",
        "jira",
        "github",
        "gitlab",
        "visualstudiocode",
        "androidstudio",
        "sonarqube",
        "figma",
    ];

    return (
        <IconCloud iconSlugs={slugs} />
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

```

# Props
## Cloud
|      name      |                 type                              | default |                           description                           |
|:--------------:|:-------------------------------------------------:|:-------:|:---------------------------------------------------------------:|
| canvasProps    | HTMLAttributes < HTMLCanvasElement > \| undefined | {}      | Attributes that will be passed to the underlying canvas element |
| children       | Tag[]                                             | []      | Tags rendered using the provided renderers                      |
| containerProps | HTMLAttributes < HTMLDivElement >  \| undefined   | {}      | Attributes passed to the root div element                       |
| id             | string \| number \| undefined                                  | uuid    | Should be provided when using SSR                               |
| options        | IOptions \| undefined                             | {}      | https://www.goat1000.com/tagcanvas-options.php                  |
## renderSimpleIcon
Used to create a tag for the Cloud component
|       name       |                       type                      |  default  |                                                                           description                                                                          |
|:----------------:|:-----------------------------------------------:|:---------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| aProps           | HTMLAttributes < HTMLAnchorElement > \| undefined | {}        | Attributes passed to the underlying anchor element                                                                                                             |
| bgHex            | string \| undefined                             | '#fff'    | The string hex of the background the icon will be rendered on. Ex: '#fff'. Used to determine if the min contrast ratio for the icons default color will be met |
| fallbackHex      | string \| undefined                             | '#000'    | The color of the icon if the minContrastRatio is not met Ex: '#000'                                                                                            |
| icon             | any                                             | undefined | The simple icon object you would like to render. Ex: import icon from "simple-icons/icons/javascript";
| imgProps | HTMLAttributes  < HTMLImageElement > \| undefined | {}      | Attributes passed to the underlying img element    |                                                         |
| minContrastRatio | number \| undefined                             | 1         | 0 - 21 The min contrast ratio between icon and bgHex before the fallbackHex will be used for the icon color                                                    |
| size             | number \| undefined                             | 42        | The size in px of the icon                                                                                                                                     |
## fetchSimpleIcons
Used when you cant statically import simple icons during build time. Calling this will use `fetch` to get icons for each provided slug.
|       name       |                       type                      |  default  |                                                                           description                                                                          |
|:----------------:|:-----------------------------------------------:|:---------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| slugs           | string[]                                         |           | Slugs to fetch svgs and colors for. The return icons may be passed to renderSimpleIcon                                                                         |


## Roadmap

See the [open issues](https://github.com/sedar007/react-icon-cloud-js/issues) for a list of proposed features.

## License

See `LICENSE` for more information.

## Contact

A. Sédar - [LinkedIn](https://www.linkedin.com/in/adjy-sedar-desir/)
