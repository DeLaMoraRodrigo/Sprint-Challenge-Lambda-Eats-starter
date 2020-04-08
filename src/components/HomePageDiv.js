import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeBodyDiv = () => {
    const HomeDiv = styled.div `
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return (
        <HomeDiv>
            <NavLink to={"/pizza"}>
                <button id="pizzaButton">PIZZA?</button>
            </NavLink>
        </HomeDiv>
    )
}

export default HomeBodyDiv;