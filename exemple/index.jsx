"use client";
import { createRoot } from 'react-dom/client';
import PropTypes from "prop-types";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
    Cloud,
    fetchSimpleIcons,
    renderSimpleIcon,
} from "react-icon-cloud-js";

export const cloudProps = {
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

export const renderCustomIcon = (icon, theme) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 42,
    });
};

export function IconCloud({ iconSlugs }) {
    const [data, setData] = useState(null);
    const {theme} = useTheme();

    useEffect(() => {
        fetchSimpleIcons({slugs: iconSlugs}).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;
        return Object.values(data.simpleIcons).map((icon) =>
            renderCustomIcon(icon, theme || "light"),
        );
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

    return(
        <>
            <IconCloud iconSlugs={slugs}/>
        </>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
