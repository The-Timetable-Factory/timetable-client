'use client';
import React, { ReactNode, useState, PropsWithChildren } from "react";
import IconButton from '@mui/material/IconButton';

//import context
import { CollapseContext } from "../../context/collapseContext";
import { useDarkMode } from "../../context/dark-mode-context";

//import MUI component
import Typography from "@mui/material/Typography";
// import style
import style from "./collapsible.module.css"

interface CollapsibleProps extends PropsWithChildren {
    // Title of the collapsible button
    title: string,
    // Component to be displayed when the collapsible button is clicked
    icon: unknown,
    // Background color of the collapsible button
    backgroundColor: string
    // Whether the collapsible button is for course or not
    isCourse: boolean
    // Variants of the animation for the collapsible button
}


export default function Collapsible(props: CollapsibleProps) {
    // get the dark mode state
    const { darkMode } = useDarkMode()
    // get the background color of the collapsible button
    const backgroundColor = props.backgroundColor
    // state to keep track of the collapse state
    const [collapse, setCollapse] = useState(true)
    // state to keep track of the hover state
    const [isHovered, setIsHovered] = useState(false)

    // style of the collapsible button
    const divStyle = {
        background: props.isCourse && !darkMode ? backgroundColor : "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${props.isCourse ? backgroundColor : '#C2B8A3'}, -2px 2px 20px ${props.isCourse ? backgroundColor : '#C2B8A3'}` : "",
    }

    // handle the click event
    function handleClick() {
        setCollapse(prev => !prev)
    }

    // handle the mouse enter event
    function handleMouseEnter() {
        setIsHovered(true)

    }
    // handle the mouse leave event
    function handleMouseLeave() {
        setIsHovered(false)
    }

    return (
        <>
            <CollapseContext.Provider value={{ collapse, setCollapse }}>

                {/* Collapsible Button */}
                <div
                    className={`${style.div} ${darkMode && style.darkModeDiv}`}
                    style={divStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    data-testid="collapsible">
                    <IconButton
                        aria-label="collapse"
                        color="info"
                        onClick={handleClick}
                        sx={{ width: "100%" }}
                        data-testid="collapsibleButton">
                        <Typography variant="h4" sx={{ color: `${darkMode && backgroundColor}` }}>{props.title}</Typography>

                        {props.icon as ReactNode}
                    </IconButton>
                </div>

                {/* Collapsible Component */}
                {!collapse &&
                    <div
                        className="center menuItemContainer"
                        data-testid="collapsibleContent"
                    >
                        {props.children}
                    </div>}
            </CollapseContext.Provider>

        </>

    )
}